import React from "react";
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
  ChartData,
} from "chart.js";
import { Point } from "../types/Point";

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const CombinedChart = ({
  selectedPoints,
  interpolatePoints,
  currentPoints,
  yMinScale,
  yMaxScale,
  xMinScale,
  xMaxScale,
}) => {
  const convertedInterpolateToDriverSteps = interpolatePoints?.reduce(
    (acc: Point[], el: Point, idx: number, arr: Point[]) => {
      if (arr[idx - 1]) acc.push({ x: el.x, y: arr[idx - 1]?.y });
      acc.push(el);
      return acc;
    },
    []
  );

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
      {
        spanGaps: true,
        showLine: true,
        label: "Driver steps",
        data: convertedInterpolateToDriverSteps,
        backgroundColor: "blue",
        borderColor: "blue",
        borderDash: [2, 2],
        borderWidth: 1,
        pointRadius: 1,
      },
      {
        spanGaps: true,
        showLine: true,
        label: "I [A]",
        data: currentPoints,
        backgroundColor: "red",
        pointRadius: 1,
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
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
      y1: {
        position: "right",
        type: "linear",
        title: {
          display: true,
          text: "I [A]",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-row bg-white p-6 rounded-lg shadow-lg flex-grow h-[45%]">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default CombinedChart;
