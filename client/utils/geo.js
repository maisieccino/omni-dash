export const generateMapsUrl = (lat, long) => {
  const query = encodeURIComponent(`${lat},${long}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

export default { generateMapsUrl };
