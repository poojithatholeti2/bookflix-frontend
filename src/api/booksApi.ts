import axiosInstance from './axiosInstance';

export interface CreateBookDto {
  title: string;
  description?: string;
  author: string;
  price: number;
  categoryId: string;
  ratingId: string;
}

export interface UpdateBookDto extends CreateBookDto {}

export interface BookListParams {
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface RecommendationQueryDto {
  query?: string;
  isExplanationNeeded?: boolean;
}

export const getBooks = (params?: BookListParams) =>
  axiosInstance.get('/api/Books', { params });

export const getBookById = (id: string) =>
  axiosInstance.get(`/api/Books/${id}`);

export const createBook = (data: CreateBookDto) =>
  axiosInstance.post('/api/Books', data);

export const createBulkBooks = (data: CreateBookDto[]) =>
  axiosInstance.post('/api/Books/bulk', data);

export const updateBook = (id: string, data: UpdateBookDto) =>
  axiosInstance.put(`/api/Books/${id}`, data);

export const deleteBook = (id: string) =>
  axiosInstance.delete(`/api/Books/${id}`);

export const recommendBooks = (data: RecommendationQueryDto) =>
  axiosInstance.post('/api/Books/recommend', data);
