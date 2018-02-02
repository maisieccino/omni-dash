export const getMetaElement = name => {
  const metas = document.getElementsByTagName("meta");
  const metaArray = Array.prototype.slice.call(metas, 0);

  return metaArray.filter(meta => meta.getAttribute("name") === name)[0];
};

/**
 * Grab meta content from the DOM.
 * @param  {String} name Name/key of the meta content to fetch
 * @return {String}      Value of the meta content
 */
export const getMetaContent = name =>
  getMetaElement(name).getAttribute("content");

export const setMetaContent = (name, value) =>
  getMetaElement(name).setAttribute("content", value);

/**
 * Send a JSON-encoded GET request to an endpoint. Also deals with Rails CSRF
 * protection.
 * @param  {string}  path         The endpoint to send request to
 * @param  {Object}  [headers={}] Additional headers to add to request
 * @return {Promise}              Promise that contains JSON response if successful
 */
export const jsonGetRequest = async (path, headers = {}) => {
  const res = await fetch(path, {
    headers: {
      Accept: "application/json",
      "X-CSRF-Token": getMetaContent("csrf-token"),
      ...headers,
    },
    credentials: "include",
  });
  const json = await res.json();
  if (res.ok) {
    return json;
  }
  if (json.message) {
    throw new Error(`Error code ${res.status}: ${json.message}`);
  }
  throw new Error(`${res.status} ${res.statusText}`);
};

/**
 * Send a JSON-encoded PUT request to an endpoint. Also deals with Rails CSRF
 * protection.
 * @param  {string}  path         The endpoint to send request to
 * @param  {Object}  body         The JSON data to Send
 * @param  {Object}  [headers={}] Additional headers to add to request
 * @return {Promise}              Promise that contains JSON response if successful
 */
export const jsonPutRequest = async (path, body, headers = {}) => {
  const res = await fetch(path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": getMetaContent("csrf-token"),
      ...headers,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json;
  try {
    json = await res.json();
  } catch (e) {
    json = {};
  }
  if (res.ok) {
    return json;
  }
  if (json.message) {
    throw new Error(`Error code ${res.status}: ${json.message}`);
  }
  throw new Error(`${res.status} ${res.statusText}`);
};

/**
 * Send a JSON-encoded POST request to an endpoint. Also deals with Rails CSRF
 * protection.
 * @param  {string}  path         The endpoint to send request to
 * @param  {Object}  body         The JSON data to Send
 * @param  {Object}  [headers={}] Additional headers to add to request
 * @return {Promise}              Promise that contains JSON response if successful
 */
export const jsonPostRequest = async (path, body, headers = {}) => {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": getMetaContent("csrf-token"),
      ...headers,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const json = res.status === 204 ? {} : await res.json();
  if (res.ok) {
    return json;
  }
  if (json.message) {
    throw new Error(`${res.status}: ${json.message}`);
  }
  throw new Error(`${res.status} ${res.statusText}`);
};

/**
 * Send a JSON-encoded DELETE request to an endpoint. Also deals with Rails CSRF
 * protection.
 * @param  {string}  path         The endpoint to send request to
 * @param  {Object}  [headers={}] Additional headers to add to request
 * @return {Promise}              Promise that contains JSON response if successful
 */
export const jsonDeleteRequest = async (path, body, headers = {}) => {
  const res = await fetch(path, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": getMetaContent("csrf-token"),
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    credentials: "include",
  });
  const json = res.status === 204 ? {} : await res.json();
  if (res.ok) {
    return json;
  }
  if (json.message) {
    throw new Error(`${res.status}: ${json.message}`);
  }
  throw new Error(`${res.status} ${res.statusText}`);
};

export default {
  getMetaContent,
  jsonGetRequest,
  jsonPutRequest,
  jsonPostRequest,
  jsonDeleteRequest,
};
