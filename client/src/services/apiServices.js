import axios from "axios";
import queryString from "query-string";
import { ACCESS_TOKEN, REFRESH_TOKEN, PB_USER } from "../constants/keys";

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
    const userDetailsFromLocalStorage = localStorage[PB_USER];
    let token;
    if(userDetailsFromLocalStorage) {
      let userDetails = JSON.parse(userDetailsFromLocalStorage);
      token = userDetails.token;
    }

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
    let errorObj = {};
    if (error.code == "CONN_ABORTED") {
      errorObj.message = "Something went wrong!";
    } 
    else {
      errorObj = error;
    }
 
    return Promise.reject(error.response ? error.response.data : error);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;