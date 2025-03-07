import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Manga {
  id: number;
  title: string;
  cover_image: string;
}

function HomePage() {
  const [mangas, setMangas] = useState<Manga[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mangas/')
      .then(response => setMangas(response.data))
      .catch(error => console.error('Error fetching manga:', error));
  }, []);

  return (
    <div>
      <h1>Manga List</h1>
      <ul>
        {mangas.map(manga => (
          <li key={manga.id}>
            <Link to={`/manga/${manga.id}`}>
              <img src={`http://127.0.0.1:8000${manga.cover_image}`} alt={manga.title} width="100"/>
              <p>{manga.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
