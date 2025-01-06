import { Option } from "../types/Options";

const options: Option[] = [
  {
    name: "yMinScale",
    label: "Y Min",
    type: "number",
    row: true,
  },
  {
    name: "yMaxScale",
    label: "Y Max",
    type: "number",
    row: true,
  },
  {
    name: "xMinScale",
    label: "X Min",
    type: "number",
    row: true,
  },
  {
    name: "xMaxScale",
    label: "X Max",
    type: "number",
    row: true,
  },
  {
    name: "inductance",
    label: "Inductance (L[H])",
    type: "number",
    row: true,
  },
  {
    name: "resistance",
    label: "Resistance (R[Ohm])",
    type: "number",
    row: true,
  },
  {
    name: "roundTo",
    label: "Round to (align clicked value to nearest divisible value)",
    type: "number",
  },
  {
    name: "driverStep",
    label: "Driver Step",
    type: "number",
  },
  {
    name: "sampling",
    label: "Sampling (number of samples, between driver steps)",
    type: "number",
  },
];

export const defaultOptions = {
  yMinScale: 0,
  yMaxScale: 10,
  xMinScale: 0,
  xMaxScale: 10,
  inductance: 0.5,
  resistance: 10,
  roundTo: 0.5,
  driverStep: 0.5,
  sampling: 25,
};

export default options;
