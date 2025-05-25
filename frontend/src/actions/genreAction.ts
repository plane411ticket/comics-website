import axios from "axios";
import { Genre } from "../types/genre/genreDetails";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchGenre = async (): Promise<Genre[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/genres/?limit=unlimited`);
        console.log("Thể loại:", response.data);
        return response.data|| []; 
    } catch (error) {
        console.error("Lỗi khi tải thể loại:", error);
        return [];
    }
};

