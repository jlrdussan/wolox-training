import Api from '../config/api';
import { IBooksResponse, IBook } from '../utils/types';
import { headers } from '../utils/sessionManagement';

export const getBooks = () =>
  Api.get<IBooksResponse>('/api/v1/books', {}, headers()).then(response => response.data);

export const getBook = (id?: string) => Api.get<IBook>(`/api/v1/books/${id}`, {}, headers());
