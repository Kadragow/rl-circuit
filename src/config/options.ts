import { Option } from "../types/Options";

const options: Option[] = [
  {
    name: "yScale",
    label: "Y Axis Scale",
    type: "number",
    defaultValue: 10,
  },
  {
    name: "xScale",
    label: "X Axis Scale",
    type: "number",
    defaultValue: 10,
  },
  {
    name: "inductance",
    label: "Inductance (L[H])",
    type: "number",
    defaultValue: 0.1,
  },
  {
    name: "resistance",
    label: "Resistance (R[Ohm])",
    type: "number",
    defaultValue: 1,
  },
  {
    name: "roundTo",
    label: "Round to (align clicked value to nearest divisible value)",
    type: "number",
    defaultValue: 0.5,
  },

  {
    name: "driverStep",
    label: "Driver Step",
    type: "number",
    defaultValue: 0.5,
  },
  {
    name: "sampling",
    label: "Sampling (number of samples, between selected points)",
    type: "number",
    defaultValue: 10,
  },
];

export const defaultOptions: { [name: string]: number | string } = {
  yScale: 10,
  xScale: 10,
  inductance: 0.1,
  resistance: 1,
  roundTo: 0.5,
  driverStep: 0.5,
  sampling: 10,
};

export default options;
