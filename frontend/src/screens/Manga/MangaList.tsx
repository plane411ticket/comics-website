import { useEffect, useState } from "react"
type Manga = {
    id: number;
    title: string;
    description: string;
    author: string;
    genre: string;
    status: string;
    cover: string;
}
export default function MangaList() {
    const [manga, setManga] = useState<Manga[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/manga")
            .then((res) => res.json())
            .then((data) => setManga(data))
            .catch((error) => console.log(error));
    }, []);

    if(!manga) return <h1>Loading...</h1>
    return (
        <div>
            <h1>Manga List</h1>
            <ul>
                {manga.map((manga) => (
                    <li key={manga.id}>
                        <img src={manga.cover} alt={manga.title} />
                        <h2>{manga.title}</h2>
                        <p>{manga.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}