export interface User{
    _id:string,
    name:string,
    email:string,
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
    post_id: string;
    type: 'novel' | 'manga' | 'audio' | 'forum';
}