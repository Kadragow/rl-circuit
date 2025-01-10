import React, { useCallback, useState } from "react";
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
import { Point } from "../types/Point";

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const SelectableChart = ({
  selectedPoints,
  addPoint,
  deletePoint,
  roundTo,
  yMinScale,
  yMaxScale,
  xMinScale,
  xMaxScale,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<Point | null>(null);

  const roundToStep = (value: number, step: number) => {
    return Math.round(value / step) * step;
  };

  const data: ChartData<"scatter"> = {
    datasets: [
      {
        spanGaps: true,
        showLine: true,
        label: "Custom Points",
        data: selectedPoints,
        backgroundColor: "black",
        pointRadius: 2,
      },
    ],
  };

  const getCanvasPosition = (event: MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const getXY = (event, chart, roundTo) => {
    const canvas = chart.canvas;
    const nativeEvent = event.native as MouseEvent;

    const canvasPosition = getCanvasPosition(nativeEvent, canvas);

    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    if (!xScale || !yScale) return { x: 0, y: 0 };

    let x = xScale.getValueForPixel(canvasPosition.x);
    let y = yScale.getValueForPixel(canvasPosition.y);

    x = roundToStep(x, roundTo);
    y = roundToStep(y, roundTo);

    return { x, y };
  };

  const handleHover = useCallback(
    throttle((event: any, elements: any[], chart: any) => {
      if (!chart) return;

      setHoveredPoint(getXY(event, chart, roundTo));
      setTooltipPosition({ x: event.native.clientX, y: event.native.clientY });
    }, 10) as unknown as (
      event: ChartEvent,
      elements: ActiveElement[],
      chart: Chart<"scatter">
    ) => void,
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
        min: xMinScale,
        max: xMaxScale,
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "t [s]",
        },
      },
      y: {
        display: true,
        min: yMinScale,
        max: yMaxScale,
        type: "linear",
        title: {
          display: true,
          text: "U [V]",
        },
      },
    },
    onClick: (event: any, elements: any[], chart: any) => {
      if (!chart) return;

      addPoint(getXY(event, chart, roundTo));
    },
    onHover: handleHover,
  };

  return (
    <div className="flex flex-row bg-white p-6 rounded-lg shadow-lg flex-grow h-[45%]">
      <div
        className="relative w-full"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <Scatter data={data} options={options} />
      </div>
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
      <div className="flex flex-col overflow-auto">
        <h3 className="mt-4 text-lg font-bold text-gray-800">Added Points:</h3>
        <ul className="mt-2 text-gray-600 columns-2 md:columns-3 gap-4">
          {selectedPoints.map((point, index) => (
            <li
              key={index}
              className="break-inside-avoid hover:line-through cursor-pointer"
              onClick={() => deletePoint(index)}
            >
              <span className="font-bold">Point {index + 1}:</span>
              <p>
                (x: {point.x.toFixed(2)}, y: {point.y.toFixed(2)})
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectableChart;
