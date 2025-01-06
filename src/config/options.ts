import { Option } from "../types/Options";

const options: Option[] = [
  {
    name: "yMinScale",
    label: "Y Min",
    type: "number",
    defaultValue: 0,
    row: true,
  },
  {
    name: "yMaxScale",
    label: "Y Max",
    type: "number",
    defaultValue: 10,
    row: true,
  },
  {
    name: "xMinScale",
    label: "X Min",
    type: "number",
    defaultValue: 0,
    row: true,
  },
  {
    name: "xMaxScale",
    label: "X Max",
    type: "number",
    defaultValue: 10,
    row: true,
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
    label: "Sampling (number of samples, between driver steps)",
    type: "number",
    defaultValue: 10,
  },
];

export const defaultOptions = {
  yMinScale: 0,
  yMaxScale: 10,
  xMinScale: 0,
  xMaxScale: 10,
  inductance: 0.1,
  resistance: 1,
  roundTo: 0.5,
  driverStep: 0.5,
  sampling: 10,
};

export default options;
