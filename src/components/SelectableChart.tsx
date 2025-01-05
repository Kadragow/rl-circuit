import React, { useCallback, useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title,
  LineElement,
  ChartOptions,
  ChartEvent,
  ChartData,
  ActiveElement,
  Chart,
} from "chart.js";
import throttle from "lodash.throttle";

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const R: number = 1;
const L: number = 0.1;
const roundEvery: number = 0.5;
const scaleX: number = 10;
const scaleY: number = 10;
const deltaT: number = 0.5;

function interpolatePoints(breakpoints: Point[], deltaT: number) {
  const interpolatedPoints: Point[] = [];

  for (let i = 0; i < breakpoints.length - 1; i++) {
    const { x: t1, y: U1 } = breakpoints[i];
    const { x: t2, y: U2 } = breakpoints[i + 1];

    // Dodaj punkt początkowy przedziału
    if (
      interpolatedPoints.length === 0 ||
      interpolatedPoints[interpolatedPoints.length - 1].x !== t1
    ) {
      interpolatedPoints.push({ x: t1, y: U1 });
    }

    // Oblicz punkty między t1 i t2
    let t = t1 + deltaT;
    while (t < t2) {
      const Ut = U1 + ((U2 - U1) * (t - t1)) / (t2 - t1); // Interpolacja liniowa
      interpolatedPoints.push({ x: t, y: Ut });
      t += deltaT;
    }

    // Dodaj punkt końcowy przedziału
    if (i === breakpoints.length - 2 || t === t2) {
      interpolatedPoints.push({ x: t2, y: U2 });
    }
  }

  return interpolatedPoints;
}

function calculateI(points: Point[], sampling: number = 100) {
  const result: Point[] = [];
  const step = deltaT / sampling;
  points.forEach((el, idx) => {
    for (let k = 0; k < sampling; k++) {
      const delta_t = k * step;
      const i_0 = (points[idx - 1]?.y ?? 0) / R;
      console.log(i_0);
      const i =
        (el.y / R) * (1 - Math.pow(Math.E, (-R / L) * delta_t)) +
        i_0 * Math.pow(Math.E, (-R / L) * delta_t);
      result.push({ x: el.x + delta_t, y: i });
    }
  });

  return result;
}

const SelectableScatterChart = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [points2, setPoints2] = useState<Point[]>([]);
  const [points3, setPoints3] = useState<Point[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<Point | null>(null);

  useEffect(() => {
    const result = interpolatePoints(points, deltaT);
    setPoints2(result);
  }, [points]);

  useEffect(() => {
    const result = calculateI(points2, 10);
    setPoints3(result);
  }, [points2]);

  const roundToStep = (value: number, step: number) => {
    return Math.round(value / step) * step;
  };

  const data: ChartData<"scatter"> = {
    datasets: [
      {
        spanGaps: true,
        showLine: true,
        label: "Custom Points",
        data: points,
        backgroundColor: "black",
        pointRadius: 2,
      },
      {
        spanGaps: true,
        showLine: true,
        label: "Interpolate",
        data: points2,
        backgroundColor: "blue",
        pointRadius: 2,
      },
      {
        spanGaps: true,
        showLine: true,
        label: "I [A]",
        data: points3,
        backgroundColor: "red",
        pointRadius: 1,
      },
    ],
  };

  const handleHover = useCallback(
    throttle((event: any, elements: any[], chart: any) => {
      if (!chart) return;

      const xScale = chart.scales.x;
      const yScale = chart.scales.y;

      if (!xScale || !yScale) return;

      const canvasPosition = {
        x: event.native.offsetX,
        y: event.native.offsetY,
      };

      let xValue = xScale.getValueForPixel(canvasPosition.x);
      let yValue = yScale.getValueForPixel(canvasPosition.y);

      // Snap values to nearest 0.5
      xValue = roundToStep(xValue, roundEvery);
      yValue = roundToStep(yValue, roundEvery);

      setHoveredPoint({ x: xValue, y: yValue });
      setTooltipPosition({ x: event.native.clientX, y: event.native.clientY });
    }, 10) as unknown as (
      event: ChartEvent,
      elements: ActiveElement[],
      chart: Chart<"scatter">
    ) => void, // Throttle to update every 50ms
    []
  );

  const options: ChartOptions<"scatter"> = {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      duration: 0,
    },
    responsive: true,
    scales: {
      x: {
        display: true,
        min: 0,
        max: scaleX,
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "t [s]",
        },
      },
      y: {
        display: true,
        min: 0,
        max: scaleY,
        type: "linear",
        title: {
          display: true,
          text: "U [V]",
        },
      },
    },
    onClick: (event: any, elements: any[], chart: any) => {
      if (!chart) return;

      // Calculate X and Y values based on click position
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;

      if (!xScale || !yScale) return;

      const canvasPosition = {
        x: event.native.offsetX,
        y: event.native.offsetY,
      };

      let xValue = xScale.getValueForPixel(canvasPosition.x);
      let yValue = yScale.getValueForPixel(canvasPosition.y);

      // Snap values to nearest 0.5
      xValue = roundToStep(xValue, roundEvery);
      yValue = roundToStep(yValue, roundEvery);

      // Add new point to the dataset
      setPoints((prev) =>
        [...prev, { x: xValue, y: yValue }].sort((a, b) => a.x - b.x)
      );
    },
    onHover: handleHover,
  };

  return (
    <div
      className="flex flex-row bg-white p-6 rounded-lg shadow-lg flex-grow h-[45%]"
      onMouseLeave={() => setHoveredPoint(null)}
    >
      <Scatter data={data} options={options} />
      {hoveredPoint && (
        <div
          className="absolute bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-lg p-2 shadow-md transform translate-x-1/2 -translate-y-full"
          style={{
            top: `${tooltipPosition?.y ?? 0}px`,
            left: `${tooltipPosition?.x ?? 0}px`,
          }}
        >
          x: {hoveredPoint.x.toFixed(2)}, y: {hoveredPoint.y.toFixed(2)}
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="mt-4 text-lg font-bold text-gray-800">Added Points:</h3>
        <ul className="mt-2 text-gray-600">
          {points.map((point, index) => (
            <li key={index}>
              Point {index + 1}: (x: {point.x.toFixed(2)}, y:{" "}
              {point.y.toFixed(2)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectableScatterChart;
