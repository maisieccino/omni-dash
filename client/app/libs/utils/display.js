// tales a CSS rem value and converts it to pixels.
export const remToPx = rem =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const iconSize = remToPx(1.2);

export default { remToPx };
