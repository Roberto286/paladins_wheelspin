export const numberOfSlices = 56;
export const wheelRadius = 360;
export const sliceSize = wheelRadius / numberOfSlices;

export const createDynamicObject = () => {
  const dinamicObj = Object.fromEntries(Array.from({ length: numberOfSlices }, (_, i) => [i + 1, numberOfSlices - i]));
  return dinamicObj;
};

type DynamicObject = { [key: number]: number };
export const prizeDisplay = (actualDeg: number, obj: DynamicObject) => {
  const positionInTheWheel = Math.round(actualDeg / sliceSize);
  return obj[positionInTheWheel];
};
