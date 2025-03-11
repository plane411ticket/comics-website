import axios from "axios";
import { ACCESS_TOKEN } from "../constant";
export interface Manga {
    id: number;
    title: string;
    author: string;
    description: string;
    cover_image: string;
    created_at: string;
}

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL
    }
)

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token)
        {
            config.headers.Authorization = 'Bearer ${token}'
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default api 
const API_BASE_URL = "http://127.0.0.1:8000/api/manga/"
export const fetchManga = async (): Promise<Manga[]> => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Manga[] = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch manga:", error);
        return [];
    }
};
