import { Point } from "../types/Point";

export const exportToCSV: (points: Point[]) => string = (points) => {
  const header = "t[s],I[A]";
  const rows = points.map((point) => `${point.x},${point.y}`).join("\n");
  return `${header}\n${rows}`;
};

export const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
