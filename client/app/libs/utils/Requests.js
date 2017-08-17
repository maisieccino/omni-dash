/**
 * Grab meta content from the DOM.
 * @param  {String} name Name/key of the meta content to fetch
 * @return {String}      Value of the meta content
 */
export const getMetaContent = (name) => {
  const metas = document.getElementsByTagName("meta");
  const metaArray = Array.prototype.slice.call(metas, 0);

  return metaArray
    .filter(meta => meta.getAttribute("name") === name)[0]
    .getAttribute("content");
};

/**
 * Send a JSON-encoded GET request to an endpoint. Also deals with Rails CSRF
 * protection.
 * @param  {string}  path         The endpoint to send request to
 * @param  {Object}  [headers={}] Additional headers to add to request
 * @return {Promise}              Promise that contains JSON response if successful
 */
export const jsonGetRequest = async (path, headers = {}) => fetch(path, {
  headers: {
    Accept: "application/json",
    ...headers,
  },
  credentials: "include",
})
  .then(res => (res.ok ? res.json() : Promise.reject("Bad network response")));

/**
 * Send a JSON-encoded PUT request to an endpoint. Also deals with Rails CSRF
 * protection.
 * @param  {string}  path         The endpoint to send request to
 * @param  {Object}  body         The JSON data to Send
 * @param  {Object}  [headers={}] Additional headers to add to request
 * @return {Promise}              Promise that contains JSON response if successful
 */
export const jsonPutRequest = async (path, body, headers = {}) => fetch(path, {
  method: "PUT",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  },
  body: JSON.stringify({
    ...body,
    authenticity_token: getMetaContent("csrf-token"),
  }),
  credentials: "include",
})
  .then(res => (res.ok ?
    Promise.resolve("ok")
    : Promise.reject("Bad network response")));

export default {
  getMetaContent,
  jsonGetRequest,
  jsonPutRequest,
};
