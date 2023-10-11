import { numberOfSlices } from './endpointCalls';

export const wheelRadius = 360;

export const getRandomAngle = async (id: number) => {
  try {
    const nOfSlices = await numberOfSlices;
    const slice = wheelRadius / nOfSlices;
    const rotation = 3600 + slice * id - 1;
    return rotation;
  } catch (error) {
    return 0;
  }
};
export const getStartAngle = async (id: number) => {
  const nOfSlices = await numberOfSlices;
  const slices = wheelRadius / nOfSlices;
  const rotation = slices * id;
  return rotation;
};
