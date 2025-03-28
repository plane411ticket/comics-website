import axios from "axios";
import { Genre } from "../types/genre/genreDetails";

const API_BASE_URL = "http://localhost:8000/api/genre";

export const fetchGenre = async (): Promise<Genre[]> => {
    try {
        const response = await axios.get(API_BASE_URL);
        console.log("API Response:", response.data); // Log để kiểm tra
        
        // Lấy mảng genres từ response.data
        return response.data.genres || []; 
    } catch (error) {
        console.error("Lỗi khi tải thể loại:", error);
        return [];
    }
};
