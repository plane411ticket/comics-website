export interface Notification {
    _id: string;
    message: string;
    link: string;
    seen: boolean;
    created_at: string;
    user: {
        id: number;
        email: string;
        first_name: string;
        cover: string;
        groups: any[];
    };
};
