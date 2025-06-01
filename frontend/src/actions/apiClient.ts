import axios from "axios";
const baseURL = import.meta.env.VITE_ADMIN_URL;
import { autoLogin  } from "./userAction";

const axiosAuth = axios.create({
  baseURL: baseURL,
  withCredentials: true, // cookie HttpOnly
  headers: { "Content-Type": "application/json" },
});

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 & chưa thử refresh token
    console.log("Error response:", error.response);
    const errorStatus = error.response?.status;
    if ((errorStatus === 401|| (errorStatus === 403) && !originalRequest._retry)) {
      originalRequest._retry = true;
      try {
        const res = await autoLogin(); // Backend set lại cookie
        console.log("Token refreshed:", res);
        return axiosAuth(originalRequest); // Thử lại request ban đầu
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuth;
