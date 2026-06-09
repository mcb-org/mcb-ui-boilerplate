import { VITE_API_URL } from "../config";
import { apiClient } from "../utils";

export const api = apiClient({
  baseURL: VITE_API_URL,
  axiosConfig: {
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const COMMON_URL = "/api/test";
