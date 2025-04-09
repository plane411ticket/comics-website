import {Novel} from './novelDetails';
export interface NovelChapter {
    id: string;
    novel: Novel;
    title: string;
    chapter_number: number;
    content: string;
    created_at: string;
}
