import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://rami-fullstack-reactjs-strapi-app.onrender.com/api",
});
