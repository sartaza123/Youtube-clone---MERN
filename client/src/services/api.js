import axios from "axios";
import NProgress from "../utils/progress";

const API = axios.create({
  baseURL: "http://localhost:5050/api",
});

/* START PROGRESS */
API.interceptors.request.use((req) => {
  NProgress.start();

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* STOP PROGRESS */
API.interceptors.response.use(
  (res) => {
    NProgress.done();
    return res;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  },
);

export default API;
