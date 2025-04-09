import axios from 'axios';
import { Dispatch } from 'redux';
import { Novel } from '../types/novel/novelDetails';
import { NovelChapter } from '../types/novel/novelChapters';

const baseURL = 'http://localhost:8000';

// string id = "baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef";

export const fetchStoryDetails = async (id: string) => {
    try{
      //const response = await axios.get(`$(baseURL)/api/novel/${id}`)
      const response = await axios.get(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef`)
      console.log(response.data);
      return response.data;
    }
    catch (error) {
        console.error("Error fetching story details:", error);
        throw error;
    }
};

export const fetchStoryChapters = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/api/novel/baa9a61e-35d5-4ac1-9d55-1fbfefbc21ef/chapters/`);
      console.log(response.data);
      return response.data;
  }

  catch (error) { 
    console.error("Error fetching story chapters:", error);
    throw error;
  }

};
