// lib/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
  timeout: 300_000, // 5 minutes — free-tier AI models can be slow
});

export default axiosInstance;
