import axios from "axios";

const MangixApi = axios.create({
  baseURL: import.meta.env.MANGIX_BACKEND_URL || "http://localhost:3001",
  withCredentials: true,
});

export default MangixApi;
