import { useEffect, useState } from "react";
import { fetchMangaList } from "./components/api";

interface Manga {
    id: number;
    title: string;
    author: string;
    description: string;
}

export default function MangaList() {
    const [mangas, setMangas] = useState<Manga[]>([]);

    useEffect(() => {
        fetchMangaList()
            .then(setMangas)
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Manga List</h1>
            <ul>
                {mangas.map((manga) => (
                    <li key={manga.id}>
                        <h2>{manga.title}</h2>
                        <p>Author: {manga.author}</p>
                        <p>{manga.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}