export interface IFormSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IFormLogin {
  email: string;
  password: string;
}

export interface IBook {
  id: number;
  author: string;
  title: string;
  image_url: string;
  editor: string;
  year: string;
  genre: string;
}

export interface IBooksResponse {
  page: IBook[];
  count: number;
  total_pages: number;
  total_count: number;
  current_page: number;
  next_page: number | null;
}

export type Nullable<T> = T | null;
