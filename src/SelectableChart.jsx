import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title,
  LineElement,
} from "chart.js";

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const SelectableScatterChart = () => {
  const [points, setPoints] = useState([]);

  const data = {
    datasets: [
      {
        spanGaps: true,
        showLine: true,
        label: "Custom Points",
        data: points,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        text: "t",
        min: 0,
        max: 10,
        type: "linear",
        position: "bottom",
      },
      y: {
        display: true,
        text: "U",
        min: 0,
        max: 10,
        type: "linear",
      },
    },
    onClick: (event, elements) => {
      const chart = event.chart;

      if (!chart) return;

      // Calculate X and Y values based on click position
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;

      if (!xScale || !yScale) return;

      const canvasPosition = {
        x: event.native.offsetX,
        y: event.native.offsetY,
      };

      const xValue = xScale.getValueForPixel(canvasPosition.x);
      const yValue = yScale.getValueForPixel(canvasPosition.y);

      // Add new point to the dataset
      setPoints(
        [...points, { x: xValue, y: yValue }].sort((a, b) => a.x - b.x)
      );
    },
  };

  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <Scatter data={data} options={options} />
      <h3>Added Points:</h3>
      <ul>
        {points.map((point, index) => (
          <li key={index}>
            Point {index + 1}: (x: {point.x.toFixed(2)}, y: {point.y.toFixed(2)}
            )
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectableScatterChart;
