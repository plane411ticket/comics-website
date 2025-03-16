import axios from 'axios';
import { TokenUser } from '../types/user/User';


export const registerUser = async (name: string, email: string, password: string): Promise<TokenUser> => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post<TokenUser>(
            `http://127.0.0.1:8000/api/register/`,
            { name, email, password },
            config
        );

        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
