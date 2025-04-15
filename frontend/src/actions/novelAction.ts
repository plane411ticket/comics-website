import axios from 'axios';
import { Dispatch } from 'redux';
import { Novel } from '../types/novel/novelDetails';
import { NovelChapter } from '../types/novel/novelChapters';
import { GenreState, AdvancedFilter } from "../types/search/advanceSearch";
const baseURL = 'http://localhost:8000';

// string id = "baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef";

export const fetchStoryDetails = async (novelid: string) => {
    try{
      const response = await axios.get(`${baseURL}/api/novel/${novelid}`)
      //const response = await axios.get(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef`)
      console.log("novel details:");
      console.log(response.data);
      return response.data;
    }
    catch (error) {
        console.error("Error fetching story details:", error);
        throw error;
    }
};

export const fetchStoryChapters = async (novelid: string) => {
  try {
    //const response = await axios.get(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef/chapters`);
    const response = await axios.get(`${baseURL}/api/novel/${novelid}/chapters`);
    console.log("list chapters:");
      console.log(response.data);
      return response.data;
  }

  catch (error) { 
    console.error("Error fetching story chapters:", error);
    throw error;
  }

};

export const fetchChapterDetail = async (chapterId: string) => {
  try {
    //const response = await axios.get(`${baseURL}/api/novel/chapters/${chapterId}`);
    const response = await axios.get(`${baseURL}/api/novel/chapter/${chapterId}`);
    console.log("chapter details:");
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching chapter detail:", error);
    throw error;
  }
};

export const updateNumberFavorite  = async (novelid: string) => {
  try{
      //const response = await axios.post(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef/updateNumFavorite/`);
      const response = await axios.put(`${baseURL}/api/novel/${novelid}/updateNumFavorite/`);
      console.log(response.data);
      return response.data;
  }

  catch (error) {
    console.error("Error update number favorite:", error);
    throw error;
  }
}
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
export const fetchAdvancedSearch = async (filters: AdvancedFilter): Promise<Novel[]> => {
    try {
        const query = new URLSearchParams();
        Object.entries(filters.genres).forEach(([genreId, state]) => {
            if(state ===1) query.append("include_genres", genreId);
            else if(state ===2) query.append("exclude_genres", genreId);
        });
        
        if (filters.minChapters) query.set("min_chapters", filters.minChapters.toString());
        if (filters.maxChapters) query.set("min_chapters", filters.maxChapters.toString());
        if (filters.author) query.set("author", filters.author);
        if (filters.status) query.set("status", filters.status);
        const response = await axios.get(`${API_BASE_URL}advanced-search?${query}/`);
        console.log(response.data);
        return response.data.results;
    } catch (error) {
        console.error("Failed to fetch advanced search results:", error);
        return [];
    }
} 