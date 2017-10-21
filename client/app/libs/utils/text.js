export const capitalise = word =>
  word
    .split("")
    .map((x, i) => (i === 0 ? x.toUpperCase() : x))
    .join("");
export const toTitleCase = string =>
  string
    .split(" ")
    .map(word => (word === "" ? word : capitalise(word)))
    .join(" ");
