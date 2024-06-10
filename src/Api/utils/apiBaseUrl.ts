import axios from "axios";

const ProtectedAxiosInstance = axios.create({
  baseURL: 'http://35.232.113.249:8080',
  headers: {
    "Content-Type": "application/json",
  },
});

export default ProtectedAxiosInstance;
