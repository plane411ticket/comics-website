export interface User{
    id:number,
    first_name:string,
    email:string,
    cover?:string,
    group?:string,
}
export interface isValidToken extends User {
    valid:boolean,
}
export interface CommentPayload {
    post_id: string;
    content: string;
    type: 'novel' | 'manga' | 'audio' | 'forum';
    parent?: string | null;
  }
export interface LikeProp{
    post_id: string;
    type: 'novel' | 'manga' | 'audio' | 'forum';
}
export interface FavoriteProp{
    user_id: string;
    post_id: string;
    type: 'novel' | 'manga' | 'audio' | 'forum';
}
export interface ListFavoriteProp {
    fav: FavoriteProp[];
}