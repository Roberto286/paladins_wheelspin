export const numberOfSlices = 56;
export const wheelRadius = 360;
export const sliceSize = wheelRadius / numberOfSlices;

export const createDynamicObject = (numProperties: number) => {
  const dinamicObj = Object.fromEntries(Array.from({ length: numProperties }, (_, i) => [i + 1, numProperties - i]));
  return dinamicObj;
};

type DynamicObject = { [key: number]: number };
export const prizeDisplay = (actualDeg: number, obj: DynamicObject) => {
  const positionInTheWheel = Math.round(actualDeg / sliceSize);
  return obj[positionInTheWheel];
};
