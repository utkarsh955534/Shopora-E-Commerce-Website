import axios from "axios";

const API = axios.create({
  baseURL: "https://shopora-e-commerce-website.onrender.com",
});

// token automatically attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
