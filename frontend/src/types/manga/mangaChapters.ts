import {Manga} from './mangaDetails';
export interface MangaChapter {
    _id: string;
    manga: Manga;
    title: string;
    chapter_number: number;
    content: string;
    created_at: string;
     // Thêm 2 trường optional cho điều hướng
    previousChapterId?: string | null;
    nextChapterId?: string | null;
}

  