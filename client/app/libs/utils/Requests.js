export const getMetaContent = (name) => {
  const metas = document.getElementsByTagName("meta");
  const metaArray = Array.prototype.slice.call(metas, 0);

  return metaArray
    .filter(meta => meta.getAttribute("name") === name)[0]
    .getAttribute("content");
};

export default {
  getMetaContent,
};
