// client/src/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // your Express API
  // withCredentials: true, // uncomment if you ever use cookies/sessions
});

export default api;
