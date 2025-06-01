import axios from "axios";
const baseURL = import.meta.env.VITE_ADMIN_URL;

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true, // cookie HttpOnly
  headers: { "Content-Type": "application/json" },
});

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 & chưa thử refresh token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await API.get("/api/refresh"); // Backend set lại cookie
//         return API(originalRequest); // Thử lại request ban đầu
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
