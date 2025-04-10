import axios from 'axios';
import { Dispatch } from 'redux';
import { Novel } from '../types/novel/novelDetails';
import { NovelChapter } from '../types/novel/novelChapters';

const baseURL = 'http://localhost:8000';

// string id = "baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef";

export const fetchStoryDetails = async (novelid: string) => {
    try{
      //const response = await axios.get(`$(baseURL)/api/novel/${novelid}`)
      const response = await axios.get(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef`)
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
    const response = await axios.get(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef/chapters`);
    //const response = await axios.get(`${baseURL}/api/novel/${novelid}/chapters/`);
      console.log(response.data);
      return response.data;
  }

  catch (error) { 
    console.error("Error fetching story chapters:", error);
    throw error;
  }

};

export const fetchChapterDetail = async (chapterId: string) => {
  const response = await axios.get(`/api/chapter/${chapterId}`);
  return response.data;
};

export const updateNumberFavorite  = async (novelid: string) => {
  try{
      const response = await axios.post(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef/updateNumFavorite/`);
      //const response = await axios.put(`${baseURL}/api/novel/${novelid}/updateNumFavorite`);
      console.log(response.data);
      return response.data;
  }

  catch (error) {
    console.error("Error update number favorite:", error);
    throw error;
  }
}
