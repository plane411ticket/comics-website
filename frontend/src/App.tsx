import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./screens/Home/HomePage";
import Navbar from "./components/Navbarapi";

const App = () => {
  return (
    <Router>
      {/* Hiển thị Navbar trên mọi trang */}
      <Navbar />  
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
