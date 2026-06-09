import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

interface ApiClientConfig {
  baseURL: string;
  axiosConfig?: AxiosRequestConfig;
}

export const apiClient = ({
  baseURL,
  axiosConfig = {},
}: ApiClientConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    ...axiosConfig,
  });

  /**
   * Request Interceptor
   * Attach token automatically
   */
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  /**
   * Response Interceptor
   * Handle global API errors
   */
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (!error.response) {
        console.error("Network error:", error);
      }

      switch (error.response?.status) {
        case 401:
          console.warn("Unauthorized - token expired");
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;

        case 403:
          console.warn("Forbidden");
          break;

        case 500:
          console.error("Server error");
          break;

        default:
          break;
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
