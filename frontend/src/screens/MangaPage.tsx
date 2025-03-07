import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Chapter {
  id: number;
  title: string;
  number: number;
}

function MangaPage() {
  const { id } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/chapters/?manga=${id}`)
      .then(response => setChapters(response.data))
      .catch(error => console.error('Error fetching chapters:', error));
  }, [id]);

  return (
    <div>
      <h1>Chapters</h1>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>
            <Link to={`/chapter/${chapter.id}`}>Chapter {chapter.number}: {chapter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MangaPage;
