export interface Manga {
    id: number;
    title: string;
    author: string;
    description: string;
    cover_image: string;
    created_at: string;
}
export interface Genre {
    _id: string;
    name: string;
  }
export interface Novel {
    _id: string;
    author: string;
    title: string;
    status: string;
    cover_image: string;
    numChapters: number;
    numViews: number;
    numLikes: number;
    numComments: number;
    numFavorites: number;
    updatedAt: string;
    genres: Genre[];
  }
