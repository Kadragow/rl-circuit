import React, { useEffect, useState } from "react";
import "./App.css";
import SelectableChart from "./components/SelectableChart.tsx";
import { defaultOptions } from "./config/options.ts";
import Options from "./components/Options.tsx";
import { Point } from "./types/Point.ts";
import { calculateCurrent } from "./lib/calculateCurrent.ts";
import { calculateInterpolatePoints } from "./lib/interpolate.ts";
import CombinedChart from "./components/CombinedChart.tsx";

function App() {
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [interpolatePoints, setInterpolatePoints] = useState<Point[]>([]);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [options, setOptions] = useState<typeof defaultOptions>({
    ...defaultOptions,
  });

  useEffect(() => {
    const result = calculateInterpolatePoints(
      selectedPoints,
      options.driverStep
    );
    setInterpolatePoints(result);
  }, [selectedPoints, options.driverStep]);

  useEffect(() => {
    const result = calculateCurrent(
      interpolatePoints,
      options.sampling,
      options.driverStep,
      options.resistance,
      options.inductance
    );
    setCurrentPoints(result);
  }, [
    interpolatePoints,
    options.sampling,
    options.driverStep,
    options.resistance,
    options.inductance,
  ]);

  const handleChange: (value: string, name: string) => void = (value, name) => {
    const parsed =
      typeof options[name] === "number" ? parseFloat(value) : value;

    setOptions((prev) => ({ ...prev, [name]: parsed }));
  };

  const addPoint = (p: Point) => {
    setSelectedPoints((prev) => [...prev, p].sort((a, b) => a.x - b.x));
  };
  const deletePoint = (idx: number) => {
    setSelectedPoints((prev) => [...prev.filter((_, pIdx) => pIdx !== idx)]);
  };

  console.log(
    options.yMinScale,
    options.yMaxScale,
    options.xMinScale,
    options.xMaxScale
  );
  return (
    <div className="App min-h-screen flex flex-col lg:flex-row gap-8 p-6 bg-gray-50">
      {/* <div className="flex flex-row gap-8"> */}
      <div>
        <Options values={options} onChange={handleChange} />
      </div>
      <div className="flex flex-col gap-8">
        <SelectableChart
          selectedPoints={selectedPoints}
          addPoint={addPoint}
          deletePoint={deletePoint}
          roundTo={options.roundTo}
          yMinScale={options.yMinScale}
          yMaxScale={options.yMaxScale}
          xMinScale={options.xMinScale}
          xMaxScale={options.xMaxScale}
        />
        <CombinedChart
          selectedPoints={selectedPoints}
          interpolatePoints={interpolatePoints}
          currentPoints={currentPoints}
          yMinScale={options.yMinScale}
          yMaxScale={options.yMaxScale}
          xMinScale={options.xMinScale}
          xMaxScale={options.xMaxScale}
        />
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
