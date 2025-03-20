import axios from 'axios';
import {Manga} from "../types/manga/mangaDetail";
const API_BASE_URL = 'http://localhost:8000/api/manga'
export const fetchManga = async (): Promise<Manga[]> => {
    try {
            const response = await axios.get(API_BASE_URL);
            console.log(response)
            const data: Manga[] = await response.data
            return data;
        } catch (error) {
            console.error("Failed to fetch manga:", error);
            return [];
        }
};