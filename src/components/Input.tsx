import React from "react";

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  value,
  defaultValue,
  label,
  onChange,
}) => {
  return (
    <label className="flex flex-col gap-2 mb-4">
      <span className="font-semibold text-gray-700">{label}</span>
      <input
        className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value, name)}
      />
    </label>
  );
};

export type InputProps = {
  name: string;
  label: string;
  type?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange: (val: string, name: string) => void;
};

export default Input;
