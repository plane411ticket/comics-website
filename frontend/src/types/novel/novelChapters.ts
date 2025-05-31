import {Novel} from './novelDetails';
export interface NovelChapter {
    _id: string;
    novel: Novel;
    title: string;
    chapter_number: number;
    content?: string;
    created_at: string;
    previousChapterId?: string | null;
    nextChapterId?: string | null;
}

  