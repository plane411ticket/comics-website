import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { navbarItems } from "../../components/Navbarapi";
import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import LogoWeb from "@/assets/logo.png";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  
  return (
    <nav className="bg-white text-black font-Nurito" id="navtop">
      {/* Div 1: Chứa logo, ô tìm kiếm, và đăng nhập */}
      <div className="container mx-auto flex justify-between items-center w-[92%] py-3 relative left font-Nurito">
        {/* Logo */}
        <div className="flex items-center gap-x-4">
          <img src={LogoWeb} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Ô tìm kiếm */}
        <div className="flex w-full max-w-md left relative">
          <input 
            type="text" 
            placeholder="Hôm nay Người đẹp muốn đọc gì..." 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>

        <div className="flex items-center gap-x-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300">
            {isDarkMode ? <FiSun size={24} className="text-yellow-400" /> : <FiMoon size={24} className="text-gray-800" />}
          </button>
        </div>

        {/* Đăng nhập / Đăng ký */}
        <div className="flex items-center gap-x-4">
          <Link to="/auth/login">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300">Đăng nhập</button>
          </Link>
          <Link to="/auth/register">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300 border-0 border-amber-50">Đăng ký</button>
          </Link>
        </div>

      </div>


      <div className="bg-gray-100 dark:bg-gray-800 m-0 p-0 min-h-0" id="navbottom">
        <ul className="container mx-auto flex justify-between items-center py-0 h-full">
          {navbarItems.map((item, index) => (
            <li key={index} className="h-full flex-1 p-0">
              <Link
                to={item.path}
                className="h-full flex items-center text-black dark:text-white justify-center px-4 py-1 min-w-[90px] hover:text-white hover:bg-yellow-400 hover:border-yellow-500 hover:rounded-lg transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>



    </nav>
  );
};

export default Navbar;
