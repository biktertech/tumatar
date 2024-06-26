import axios from "axios";

const instance = axios.create({
    baseURL: "http://3.0.127.176:3000",
});

instance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem("auth"));
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default instance;