import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../types/user/userSlice';
import { CommentPayload } from '../types/user/User';
import { LikeProp, User } from '../types/user/User';
const baseURL = 'http://localhost:8000'
    
export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const config = {
            headers: { 'Content-Type': 'Application/json' },
            withCredentials:true,
        }
        const response = await axios.post(
            `${baseURL}/api/register/`, 
            {name, email, password }, // gửi thông tin user về backend
            config
        );

        console.log(response); // Debug kết quả
        return response;
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
            throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const config = {
            headers: { 'Content-Type': 'Application/json' },
            withCredentials:true,
        }
        const response = await axios.post(`${baseURL}/api/login/`, 
            {email, password}, 
            config
        );
        console.log(response); // Debug kết quả
        return response
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
    }
};

export const logoutUser = async () => {
    const config = {
        headers: { 'Content-Type': 'Application/json' },
        withCredentials:true,
    }
    const response = await axios.post(
        `${baseURL}/api/logout/`,
        {}, 
        config
    );
    console.log(response); // Debug kết quả
};


export const fetchProfile = async (): Promise<User | null> => {
    try {
        const config = {
            headers: { 'Content-Type': 'Application/json' },
            withCredentials:true,
        }
        const response = await axios.get(
            `${baseURL}/api/me/`,  
            config
        );
        const user = response.data?.results?.[0];
        console.log("User profile fetched:", user);
        return user ? (user as User) : null;
        
    } catch (error) {
        console.error("Cần đăng nhập/đăng ký:", error);
        throw error;
    }
};

export const useAutoLogin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const autoLogin = async () => {
            const config = { withCredentials: true };
            try {
                // Bước 1: Refresh token
                await axios.post(`${baseURL}/api/refresh/`, {}, config);
                console.log("Refresh token thành công");

                // Bước 2: Gọi fetchProfile để lấy user info
                const profile = await fetchProfile();

                if (profile) {
                    dispatch(
                        login({
                            first_name: profile.first_name,
                            cover: profile.cover,
                            isLogin: true,
                        })
                    );
                } else {
                    console.log("Không lấy được profile");
                }

            } catch (error) {
                console.error("Tự động đăng nhập thất bại:", error);
            }
        };

        autoLogin();
    }, [dispatch]);
};
export const useComment = async (payload: CommentPayload): Promise<void> => {
  try{
    const config = {
      headers: {'Content-Type': 'Application/json'},
      withCredentials:true,
    };
    const response = await axios.post(
      `${baseURL}/api/comment/`,
        payload,
        config
    );
    return response.data;
  } catch (error) {
    console.error("Error sending comment:", error);
    throw error;
  }
}

export const updateLike  = async ({ post_id, type }: LikeProp) => {
  try{
      const config = {
            withCredentials:true,
        }
      const response = await axios.post(`${baseURL}/api/like/`,
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

