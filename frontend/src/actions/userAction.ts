import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from '../types/user/userSlice';
import { LikeProp, User } from '../types/user/User';
import { Comment } from '../types/user/User';
import store from '../store';
import axiosAuth from './apiClient';
const baseURL = import.meta.env.VITE_ADMIN_URL;

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true,
        }
        const response = await axios.post(
            `${baseURL}/api/register/`, 
            {username, email, password }, // gửi thông tin user về backend
            config
        );

        console.log(response); // Debug kết quả
        return response;
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
            throw error;
    }
};

export const loginUser = async (username: string, password: string, dispatch: any) => {
    try {
        const config = {
            headers: { 'Content-Type': 'Application/json' },
            withCredentials:true,
        }
        const response = await axios.post(`${baseURL}/api/login/`, 
            {username, password}, 
            config
        );
        const user = response.data.user;
        dispatch(
            login({
                id: user.id,
                email:user.email,
                name: username,
                cover: `${baseURL}${user.cover}`,
                isLogin: true,
            })
        );
        console.log(response); // Debug kết quả
        return response
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
    }
};

export const logoutUser = async () => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials:true,
    }
    const response = await axios.post(
        `${baseURL}/api/logout/`,
        {}, 
        config
    );
    console.log("Logout",response); // Debug kết quả
};


export const fetchProfile = async (username?:string): Promise<User | null> => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true,
        }
        var response = null, user = null;
        if(username) {
            response = await axios.get(
                `${baseURL}/api/user/${username}/`,  
                config
            );
            user = response.data;
        }
        else {
            response = await axios.get(
                `${baseURL}/api/me/`,  
                config
            );
            user = response.data?.results?.[0];
            console.log("Me:", response);
        }
        console.log("User profile fetched:", user);
        return user ? (user as User) : null;
        
    } catch (error) {
        console.error("Cần đăng nhập/đăng ký:", error);
        throw error;
    }
};


export const autoLogin = async () => {
    const config = { withCredentials: true };
    try {
        // Bước 1: Refresh token
        await axios.post(`${baseURL}/api/refresh/`, {}, config);
        console.log("Refresh token thành công");

        // Bước 2: Gọi fetchProfile để lấy user info
        const profile = await fetchProfile();
        
        if (profile) {
            store.dispatch(
                login({
                    id: String(profile.id),
                    email: profile.email,
                    name: profile.username,
                    first_name: profile.first_name,
                    cover: profile.cover,
                    isLogin: true,
                })
            );
        } else {
            store.dispatch(logout());
            console.log("Không lấy được profile");
        }

    } catch (error) {
        console.error("Tự động đăng nhập thất bại:", error);
    }
};


interface CommentsOptions {
  chapter_type?: string;
  chapter_id?: string;
  content_type?: string;
  object_id?: string;
}

export const postComment = async (post_id:string, content:string, type:string, parent:number | null) => {
  try{
    const config = {
      headers: {'Content-Type': 'application/json'},
      withCredentials:true,
    };
    console.log("Post ID:", post_id);
    const response = await axiosAuth.post(
      `${baseURL}/api/comment/`,
        {
            content: content,
            content_type: post_id,
            parent: parent || null, // Nếu không có parent thì để là null
            target_model: type,
            target_object_id: post_id,
        },
        config
    );
    return response.data;
  } catch (error) {
    console.error("Vui lòng đăng nhập trước khi gửi:", error);
    throw error;
  }
}

export const fetchComments = async (options: CommentsOptions): Promise<Comment[]> => {

    const config = {
      headers: {'Content-Type': 'application/json'},
      withCredentials:true,
    };
    const url = new URL(`${baseURL}/api/comment/`);
    if (options.chapter_type && options.chapter_id) {
        url.searchParams.append("chapter_type", options.chapter_type);
        url.searchParams.append("chapter_id", options.chapter_id);
    } else if (options.content_type && options.object_id) {
        url.searchParams.append("content_type", options.content_type);
        url.searchParams.append("object_id", options.object_id);
    } else {
        throw new Error("Missing required query parameters");
    }

    const response = await axios.get(url.toString(),config);
    console.log("Comments fetched:", response.data.results);
    return response.data.results || [];
}


export const updateLike  = async ({ post_id, type }: LikeProp) => {
  try{
      const config = {
            withCredentials:true,
        }
      const response = await axiosAuth.post(`${baseURL}/api/like/`,
        {
          post_id: post_id,
          type: type
        },
        config
      );
      console.log("Like update: ",response.data);
      return response.data;
  }

  catch (error) {
    console.error("Error update number of like:", error);
    throw error;
  }
}

export const updateFavorite  = async ({ post_id, type }: LikeProp) => {
  try{
      const config = {
            withCredentials:true,
        }
      const response = await axios.post(`${baseURL}/api/favorite/`,
        {
          post_id: post_id,
          type: type
        },
        config
      );
      console.log("Fav update: ",response.data);
      return response.data;
  }

  catch (error) {
    console.error("Error update number favorite:", error);
    throw error;
  }
  
}


 export const updateAvatar = async (formData: FormData) => {
  const res = await axios.post("/api/user/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return res.data;
};
