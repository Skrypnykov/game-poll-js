import { URL } from "./constants.js";

export async function apiGet(URL) {
  const requestProp = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(URL, requestProp);

  if (!response.ok) {
    const error = {status: response.status, statusText: response.statusText};
    return error
    throw new Error(error);
  }
  const body = await response.json();
  return body;
}
