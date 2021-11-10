const baseURL = process.env.REACT_APP_API_URL + "/api";

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
  console.log(requestURL);
  return fetch(requestURL, {
    method: "GET",
    headers: getHeader(),
  })
    .then((res) => res.json())
    .catch((err) => err);
}

function getHeader() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  if (!loginUser)
    return {
      "Content-Type": "application/json",
    };
  const token = loginUser.accessToken;
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}
