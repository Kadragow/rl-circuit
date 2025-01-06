import { Point } from "../types/Point";

export function calculateInterpolatePoints(
  breakpoints: Point[],
  driverStep: number
) {
  const interpolatedPoints: Point[] = [];
  if (driverStep <= 0) return interpolatedPoints;

  for (let i = 0; i < breakpoints.length - 1; i++) {
    let { x: t1, y: U1 } = breakpoints[i];
    let { x: t2, y: U2 } = breakpoints[i + 1];

    // Fixing JavaScript issues with float
    t1 = parseFloat(t1.toFixed(10));
    U1 = parseFloat(U1.toFixed(10));
    t2 = parseFloat(t2.toFixed(10));
    U2 = parseFloat(U2.toFixed(10));

    if (!interpolatedPoints.length || interpolatedPoints.at(-1)!.x !== t1) {
      interpolatedPoints.push({ x: t1, y: U1 });
    }

    for (
      let t = parseFloat((t1 + driverStep).toFixed(10));
      t < t2;
      t = parseFloat((t + driverStep).toFixed(10))
    ) {
      let Ut = U1 + ((U2 - U1) * (t - t1)) / (t2 - t1);
      Ut = parseFloat(Ut.toFixed(10));
      interpolatedPoints.push({ x: t, y: Ut });
    }

    interpolatedPoints.push({ x: t2, y: U2 });
  }

  return interpolatedPoints;
}
