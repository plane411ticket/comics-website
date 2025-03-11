import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import HomePage from "./screens/Home/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
