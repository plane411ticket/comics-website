const API_URL = "http://127.0.0.1:8000/api/manga/";

export async function fetchMangaList() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch mangas");
    return response.json();
}
