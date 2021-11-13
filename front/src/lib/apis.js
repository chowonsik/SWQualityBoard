const baseURL = process.env.REACT_APP_API_URL + "/api";

export function request(method, url, data) {
  return fetch(baseURL + url, {
    method: method,
    headers: getHeader(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
}

export function requestPost(url, data) {
  return fetch(baseURL + url, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err);
}

export function requestGet(url, params) {
  const requestURL = params
    ? baseURL + url + "?" + new URLSearchParams(params)
    : baseURL + url;
  return fetch(requestURL, {
    method: "GET",
    headers: getHeader(),
  })
    .then((res) => res.json())
    .catch((err) => err);
}

function getHeader() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token)
    return {
      "Content-Type": "application/json",
    };
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token.accessToken,
  };
}
