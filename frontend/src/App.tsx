import { Outlet } from "react-router-dom";
import Navbar from "./screens//Navbar/Navbar.tsx";
import "./index.css";

const App = () => {
  return (
    <div>
      <Navbar />  {/* Navbar luôn hiển thị */}
      <Outlet />   {/* Nội dung trang sẽ thay đổi ở đây */}
    </div>
  );
};

export default App;
