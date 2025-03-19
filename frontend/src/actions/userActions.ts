import axios from 'axios';
import api from './apiClient'
const baseApiUrl = 'http://localhost:8000'
export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${baseApiUrl}/api/register/`, { name, email, password });
        console.log(response.data); // Debug kết quả
        return response.data;
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        throw error;
    }
};
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post(`${baseApiUrl}/api/login/`, {email, password });
        console.log(response); // Debug kết quả
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
    }
};

export const fetchProfile = async () => {
    try {
        const response = await api.post("/api/profile/");
        console.log(response.data); // Debug kết quả
        return response.data;
        
    } catch (error) {
        console.error("Cần đăng nhập/đăng ký:", error);
        throw error;
    }
};