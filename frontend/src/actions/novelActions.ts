import axios from 'axios';
import {Novel} from "../types/manga/mangaDetail";
const API_BASE_URL = 'http://127.0.0.1:8000/api/novel/'
export const fetchNovel = async (page=1): Promise<Novel[]> => {
    try {
            const response = await axios.get(API_BASE_URL+"?page="+page);
            console.log(response)
            console.log(API_BASE_URL+"?page="+page)
            const data = await response.data
            return Array.isArray(data.results) ? data.results : [];
        } catch (error) {
            console.error("Failed to fetch novel:", error);
            return [];
        }
};