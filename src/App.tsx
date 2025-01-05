import React, { useState } from "react";
import "./App.css";
import SelectableScatterChart from "./components/SelectableChart.tsx";
import { defaultOptions } from "./config/options.ts";
import Options from "./components/Options.tsx";

function App() {
  const [options, setOptions] = useState<{ [name: string]: string | number }>(
    defaultOptions
  );

  const handleChange: (value: string, name: string) => void = (value, name) => {
    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App min-h-screen flex flex-col lg:flex-row gap-8 p-6 bg-gray-50">
      {/* <div className="flex flex-row gap-8"> */}
      <div className="lg:max-w-xs flex-shrink-0">
        <Options values={options} onChange={handleChange} />
      </div>
      <div className="flex flex-col gap-8">
        <SelectableScatterChart />
        <SelectableScatterChart />
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
