export interface User {
  id: number;
  username: string;
}

export interface Post {
  id: number;
  user: User;
  imageUrl: string;
  description: string;
  commentCount: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  createdAt: string;
}


export interface UserState {
    id: number | null,
    name: string | null,
    token: string | null,
}

export const initialState: UserState = {
  id: null,
  name: null,
  token: null,
};


export interface Notification {
  postId: number;
  authorId: number;
  user: string;
  message: string;
}
