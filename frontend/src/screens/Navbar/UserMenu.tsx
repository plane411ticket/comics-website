import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../types/user/userSlice";
import { logoutUser } from "../../actions/userAction";
import { useSelector } from "react-redux";
import { selectUser } from "../../types/user/userSlice";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
  };
  // const baseUrl = import.meta.env.VITE_ADMIN_URL;
  return (
    <div className="relative">
      <img src={userInfo?.cover} alt="Avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <Link to="/profile/me" className="block px-4 py-2 hover:bg-gray-200">Hồ sơ</Link>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
