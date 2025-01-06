import { Point } from "../types/Point";

export function calculateCurrent(
  points: Point[],
  sampling: number = 100,
  driverStep: number,
  R: number,
  L: number
) {
  const result: Point[] = [];
  //   const step = driverStep / sampling;

  points.forEach((el, idx) => {
    const diff = points[idx + 1]?.x - points[idx].x;
    const step = (isNaN(diff) ? driverStep : diff) / sampling;
    console.log(idx * sampling, result.length);
    const i_0 = result[idx * sampling - 1]?.y ?? 0; // (points[idx - 1]?.y ?? 0) / R;

    for (let k = 0; k < sampling; k++) {
      const delta_t = k * step;
      const expFactor = Math.exp((-R / L) * delta_t);
      const i = (el.y / R) * (1 - expFactor) + i_0 * expFactor;
      result.push({ x: el.x + delta_t, y: i });
    }
  });

  return result;
}
