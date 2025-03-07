import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import MangaPage from './screens/MangaPage';
import ChapterPage from './screens/ChapterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manga/:id" element={<MangaPage />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
