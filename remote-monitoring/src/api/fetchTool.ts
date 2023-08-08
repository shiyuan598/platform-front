declare global {
  interface Window {
    globalConfig?: any;
  }
}
const globalConfig = window.globalConfig;
const baseUrl = globalConfig.api;

export const get = (
  url: string,
  params?: { [propName: string]: string | number }, blob: boolean = false
) => {
  url = baseUrl + url;
  if (params) {
    const paramStr = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    url = `${url}?${paramStr}`;
  }
  return fetch(url).then((v) => {
    if (blob) {
      return v.blob();
    }
    return v.json();
  });
};

export const post = (
  url: string,
  params?: { [propName: string]: string | number }
) => {
  return fetch(baseUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params),
  }).then((v) => v.json());
};

export const del = (
  url: string,
  params?: { [propName: string]: string | number }
) => {
  return fetch(baseUrl + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params),
  }).then((v) => v.json());
};
