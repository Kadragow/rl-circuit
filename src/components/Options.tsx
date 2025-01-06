import React from "react";
import options from "../config/options.ts";
import { Option } from "../types/Options.ts";
import Input from "./Input.tsx";

const Options: React.FC<OptionsProps> = ({ values, onChange }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-md w-[500px]">
      <div className="flex flex-row flex-wrap gap-4">
        {options.map((el: Option) => (
          <Input
            className={el.row ? "flex-grow" : "flex-none"}
            key={el.name}
            type={el.type}
            name={el.name}
            label={el.label}
            value={values[el.name]}
            defaultValue={el.defaultValue}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export type OptionsProps = {
  values: { [name: string]: string | number };
  onChange: (val: string, name: string) => void;
};

export default Options;
