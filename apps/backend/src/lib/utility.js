export function rgbToHex(r, g, b) {
  const toHex = (val) => {
    const hex = val.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${[r, g, b].map((el) => toHex(el)).join('')}`;
}
