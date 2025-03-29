import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { navbarItems } from "../../components/Navbarapi";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../types/user/userSlice";
import { logoutUser } from "../../actions/userActions";
import { AppDispatch } from "../../store";

// Import các component riêng
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector(selectUser);

  return (
    <nav className="bg-white text-black font-Nurito" id="navtop">
      {/* Nav Top */}
      <div className="max-w-screen-lg w-full mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <SearchBar />
        <ThemeSwitcher />
        
        {/* Hiển thị UserMenu nếu đã đăng nhập */}
        <div className="hidden lg:flex items-center space-x-4">
          {!userInfo ? (
            <>
              <Link to="/auth/login">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300">
                  Đăng nhập
                </button>
              </Link>
              <Link to="/auth/register">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300">
                  Đăng ký
                </button>
              </Link>
            </>
          ) : (
            <UserMenu />
          )}
        </div>

        {/* Nút Menu Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-lg">
          <FiMenu />
        </button>
      </div>

      {/* Nav Bottom (Desktop) */}
      <div className=" lg:block bg-gray-100 dark:text-black dark:bg-white m-0 p-0 min-h-0 hidden " id="navbottom" >
        <ul className="container mx-auto flex justify-between items-center py-0 h-full">
          {navbarItems.map((item, index) => (
            <li key={index} className="h-full flex-1 p-0">
              <Link
                to={item.path}
                className="h-full flex items-center text-black justify-center px-4 py-1 min-w-[90px] hover:text-black hover:bg-yellow-400 hover:border-yellow-500 hover:rounded-lg transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Navbar;
