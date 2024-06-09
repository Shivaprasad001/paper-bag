import axios from "axios";
import queryString from "query-string";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/keys";

const API_BASE = import.meta.env.VITE_API_BASE;

export const client = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (p) => {
    const params = { ...p };

    return queryString.stringify(params, "&", "=", { arrayFormat: "repeat" });
  },
});

client.interceptors.request.use(
  (req) => {
    const token = localStorage[ACCESS_TOKEN];

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },

  (error) => Promise.reject(error)
);

const request = (options, byPassError) => {
  const onSuccess = (response) => response.data;

  const onError = (error) => {
    if (error.code == "CONN_ABORTED") {
      console.log("Something went wrong");
    } else {
      console.log("Else Something went wrong");
    }

    return Promise.reject(error.response ? error.response.data : error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;