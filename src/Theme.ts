const wheelSize = 400;
const diameter = 350;
const radius = diameter / 2;
const numberOfSlices = 46;
const circumfrance = 6.283185307 * radius;
const sliceHeight = circumfrance / numberOfSlices;
const sliceOffset = sliceHeight / 2;
const rotation = 360 / numberOfSlices;

// colors
const lightBlue = '#095b8d';
const white = '#ffff';
const darkOrange = '#c27028';
const black = '#000000';

const theme = {
  wheelProperties: {
    wheelSize,
    diameter,
    radius,
    numberOfSlices,
    circumfrance,
    sliceHeight,
    sliceOffset,
    rotation,
  },
  colors: {
    lightBlue,
    white,
    darkOrange,
    black,
  },
};

export default theme;
