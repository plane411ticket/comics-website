// import { Link, Outlet } from "react-router-dom";
import bglogin from "@/assets/backlogin.png";
import LogoWeb from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { loginUser } from "../../actions/userActions";
export default function LoginScreen() {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);
    
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(()=>{
        userRef.current?.focus();
    },[]);

    useEffect(()=>{
        setErrMsg('');
    },[pwd,email]);
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            await loginUser(email,pwd);
            setSuccess(true);
            setEmail('');
            setPwd('');
        }
        catch (err: any) {
            setErrMsg('Login Failed');
            if (errRef.current) {
                errRef.current.focus();
            }
        }  
        setSuccess(true);
    }
    return (
        <div className="bg-black text-white font-Nurito flex items-center justify-center h-screen">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/">Back to home</Link>
                    </p>
                </section>
            ) : (
                <>
                    <div className="bg-black text-white font-Nurito flex items-center justify-center h-screen">
                    {/* Cột bên trái (Ảnh) */}
                        <div className="w-11/20 h-full flex items-center justify-center">
                            <img src={bglogin} alt="loginbackground" className="max-w-full h-auto" />
                        </div>

                        {/* Cột bên phải (Form đăng nhập) */}
                        
                        <div className="w-9/20 p-8 rounded-lg shadow-lg mr-20">
                            <div className="w-11/20 h-full flex items-center justify-center ml-30">
                                <Link to="/"><img src={LogoWeb} alt="loginbackground" className="max-w-full h-auto" /></Link>
                            </div>
                            <div className="bg-gray-800 w-5/5 mr-10 border-t-orange-500 border-t-5">
                                <div className="h-4 "></div>
                                <form className="bg-gray-800 ml-10 mr-10 " onSubmit={handleSubmit}>
                                    <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Đăng nhập vào tài khoản của bạn</h1>
                                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                    <div className="mb-4 w-full">
                                        <label htmlFor="email" className="block font-medium w-full">Email</label>
                                        <input 
                                        type="email" 
                                        id="email"
                                        ref = {userRef}
                                        autoComplete="on"
                                        onChange={(e)=>setEmail(e.target.value)}
                                        value = {email}
                                        className="p-2 border rounded w-full" placeholder="Nhập email" required />
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
                                    <div className="flex justify-between">
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
                                    <button type="submit" className="w-full  bg-orange-500 text-white p-2 rounded hover:bg-yellow-400">Đăng nhập</button>
                                    <div className="h-4"></div>

                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-2"></div>
                                        <h2>New user?</h2>
                                        <Link to="/auth/register" className="text-orange-500 hover:text-yellow-400">Register</Link>
                                        <div className="h-3"></div>
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
