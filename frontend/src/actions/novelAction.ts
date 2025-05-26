import axios from 'axios';
//import { Dispatch } from 'redux';
import { Novel } from '../types/novel/novelDetails';

const baseURL = 'http://localhost:8000';

export const fetchStoryDetails = async (novelid: string) => {
    try{
      const response = await axios.get(`${baseURL}/api/novel/${novelid}`)
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



export const updateNumberComments = async (novelid: string) => {
  try {
      const response = await axios.put(`${baseURL}/api/novel/${novelid}/updateNumComments/`);
      console.log(response.data);
      return response.data;
  } 
  
  catch (error) {
      console.error("Error updating number of comments:", error);
      throw error;
  }
}


export const fetchNovel = async (page=1): Promise<Novel[]> => {
    try {
            const response = await fetch(`${baseURL}/api/novel/?page=${page}`);
            console.log(response)
            console.log(`${baseURL}/api/novel/?page=${page}`)
            const data = await response.json();
            return Array.isArray(data.results) ? data.results : [];
        } catch (error) {
            console.error("Failed to fetch novel:", error);
            return [];
        }
};
