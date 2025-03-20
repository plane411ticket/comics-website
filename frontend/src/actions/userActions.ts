import axios from 'axios';
import api from './apiClient'
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { login,logout } from "../types/user/userSlice";
import {UserLoginActionTypes,} from '../types/user/UserLogin'
import {UserRegisterActionTypes,} from '../types/user/UserRegister'
import {UserDetailActionTypes,} from '../types/user/UserDetail'

const baseApiUrl = 'http://localhost:8000'
    
export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${baseApiUrl}/api/register/`, { name, email, password });
        console.log(response.data); // Debug kết quả
        return response.data;
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        // dispatch({
        //     type: UserLoginActionTypes.USER_LOGIN_FAILURE,
        //     payload: error
        // })
        
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post(`${baseApiUrl}/api/login/`, {email, password });
        return response.data
        console.log(response); // Debug kết quả
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
    }
};

export const logoutUser = async () => {
    const response = await axios.post(`${baseApiUrl}/api/logout/`);
    console.log(response); // Debug kết quả
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