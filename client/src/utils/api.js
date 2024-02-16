import axios from "axios";

const api = axios.create({
  baseURL: "https://node-novotech-api.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user?.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
