import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://fullstack-reactjs-strapi-app.onrender.com/api",
});
