// import { Link, Outlet } from "react-router-dom";
import bglogin from "@/assets/backlogin.png";
import { Link } from "react-router-dom";

export default function LoginScreen() {
  return (
    <div className="bg-black text-white font-Nurito flex items-center justify-center h-screen">
      {/* Cột bên trái (Ảnh) */}
        <div className="w-11/20 h-full flex items-center justify-center">
            <img src={bglogin} alt="loginbackground" className="max-w-full h-auto" />
        </div>

        {/* Cột bên phải (Form đăng nhập) */}
        <div className="w-9/20 p-8 rounded-lg shadow-lg mr-20">
            <div className="bg-gray-800 w-5/5 mr-10 border-t-orange-500 border-t-5">
                <div className="h-4 "></div>
                <form className="bg-gray-800 ml-10 mr-10 ">
                    <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Đăng nhập vào tài khoản của bạn</h1>
                    <div className="mb-4 w-full">
                        <label className="block font-medium w-full">User Name or Email</label>
                        <input type="email" className="p-2 border rounded w-full" placeholder="Nhập username hoặc email" required />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block font-medium w-full">Password</label>
                        <input type="password" className="p-2 border rounded w-full" placeholder="Nhập mật khẩu" required />
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
  );
}
