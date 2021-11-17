import axios from "axios";
import environment from "environment/environment";

const instance = axios.create({
  baseURL: `${environment.backEnd}/api/v1/`,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  const session_id = localStorage.getItem("session_id");
  config.headers.Token = token;
  config.headers.Sesion = session_id;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(new Error(error));
  }
);

export default instance;
