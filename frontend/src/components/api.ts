export interface Manga {
    id: number;
    title: string;
    author: string;
    description: string;
    cover_image: string;
    created_at: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/manga/";

export const fetchManga = async (): Promise<Manga[]> => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Manga[] = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch manga:", error);
        return [];
    }
};
