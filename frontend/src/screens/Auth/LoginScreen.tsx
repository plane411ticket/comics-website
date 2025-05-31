// import { Link, Outlet } from "react-router-dom";
import bglogin from "@/assets/Logo_real.png";

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { loginUser } from "../../actions/userAction";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { login } from "../../types/user/userSlice";
export default function LoginScreen() {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);
    
    // const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        userRef.current?.focus();
    },[]);

    useEffect(()=>{
        setErrMsg('');
    },[pwd,username]);
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const response = await loginUser(username, pwd);
            if(response?.status!==200) throw Error("Login Failed");
            dispatch(login({isLogin:true}))
            setSuccess(true);
            setUsername('');
            setPwd('');
        }
        catch (err: any) {
            console.log("run")
            setErrMsg('Login Failed');
            if (errRef.current) {
                errRef.current.focus();
            }
            setSuccess(false);
        }  
    }
    return (
        <div className="bg-orange-800 text-white font-Nurito flex items-center justify-center h-screen">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/">Back to home</Link>
                    </p>
                </section>
            ) : (
                <>
                    <div className="bg-white text-white font-Nurito flex flex-col md:flex-row items-center justify-center min-h-screen px-4">
                    {/* Cột bên trái (Ảnh) */}
                        <div className="hidden md:flex md:w-2/5 lg:w-2/5 h-auto items-center justify-center">
                            <Link to="/"> 
                                <img src={bglogin} alt="loginbackground" className="max-w-full h-auto" />
                            </Link>
                        </div>

                        {/* Cột bên phải (Form đăng nhập) */}
                        
                        <div className=" bg-orange-800 w-full md:w-3/5 lg:w-3/5 p-6 md:p-8 rounded-lg shadow-lg md:mr-10">
                                
                                
                                <div className="bg-orange-900 w-5/5 md:w-full md:text-base lg:w-full mr-10 border-t-orange-800 border-t-5">
                                    <div className="h-4 "></div>
                                    <form className="bg-orange-900 ml-10 mr-10 " onSubmit={handleSubmit}>
                                        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Đăng nhập</h1>
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                        <div className="mb-4 w-full">
                                        <label className="font-medium whitespace-nowrap">Username</label>
                                            <input 
                                            type="text" 
                                            id="username"
                                            ref = {userRef}
                                            autoComplete="on"
                                            onChange={(e)=>setUsername(e.target.value)}
                                            value = {username}
                                            className="p-2 border rounded w-full" placeholder="Nhập username" required />
                                        </div>

                                        <div className="mb-4 w-full">
                                            <label className="block font-medium w-full">Password</label>
                                            <input 
                                            type="password"
                                            id="password"
                                            onChange={(e)=>setPwd(e.target.value)}
                                            value = {pwd}
                                            className="p-2 border rounded w-full" placeholder="Nhập mật khẩu" required />
                                        </div>

                                        <div className="flex flex-col sm:flex-row md:flex-col justify-between space-y-2 sm:space-y-0">
                                            <div className="flex items-center">
                                                <input type="checkbox" id="remember" className="w-5 h-5 bg-gray-600" />
                                                <label htmlFor="remember" className="ml-2">Remember Account</label>
                                            </div>

                                            <div className="flex items-center">
                                                <input type="checkbox" id="forgot" className="w-5 h-5 bg-gray-600" />
                                                <label htmlFor="forgot" className="ml-2">Forgot Password</label>
                                            </div>
                                        </div>

                                        <div className="h-4"></div>
                                        <button type="submit" className="w-full  bg-red-700 text-white p-2 rounded hover:bg-yellow-400">Đăng nhập</button>
                                        <div className="h-4"></div>

                                        <div className="flex flex-row justify-center items-center mt-6 space-x-2 whitespace-nowrap pb-4">
                                            <span>New user?</span>
                                            <Link to="/auth/register" className="text-red-600 hover:text-yellow-400">Register</Link>
                                            <span className="h-3"></span>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                </>
            )}
        </div>
  );
}
