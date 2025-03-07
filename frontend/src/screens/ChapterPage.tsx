import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Page {
  id: number;
  image: string;
  page_number: number;
}

function ChapterPage() {
  const { id } = useParams();
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/pages/?chapter=${id}`)
      .then(response => setPages(response.data))
      .catch(error => console.error('Error fetching pages:', error));
  }, [id]);

  return (
    <div>
      <h1>Chapter {id}</h1>
      {pages.map(page => (
        <img key={page.id} src={`http://127.0.0.1:8000${page.image}`} alt={`Page ${page.page_number}`} width="100%"/>
      ))}
    </div>
  );
}

export default ChapterPage;
