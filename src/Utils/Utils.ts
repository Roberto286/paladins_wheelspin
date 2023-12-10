import { NOTIFICATION_TYPE, Store } from 'react-notifications-component';

export const wheelRadius = 360;

export const sliceCalc = (nOfSlices: number) => {
  return wheelRadius / nOfSlices;
};

export const getRandomAngle = (id: number, championsCount: number) => {
  return 3600 + sliceCalc(championsCount) * id - 1;
};

export const showNotification = (title: string, message: string, type: NOTIFICATION_TYPE) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};
