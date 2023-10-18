export const wheelRadius = 360;

export const sliceCalc = (nOfSlices: number) => {
  return wheelRadius / nOfSlices;
};

export const getRandomAngle = (id: number, championsCount: number) => {
  return 3600 + sliceCalc(championsCount) * id - 1;
};
