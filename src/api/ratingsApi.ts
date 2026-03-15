import axiosInstance from './axiosInstance';

export interface CreateRatingDto {
  ratingName: string;
}

export interface UpdateRatingDto {
  ratingName: string;
}

export interface RatingListParams {
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export const getRatings = (params?: RatingListParams) =>
  axiosInstance.get('/api/Ratings', { params });

export const getRatingById = (id: string) =>
  axiosInstance.get(`/api/Ratings/${id}`);

export const createRating = (data: CreateRatingDto) =>
  axiosInstance.post('/api/Ratings', data);

export const updateRating = (id: string, data: UpdateRatingDto) =>
  axiosInstance.put(`/api/Ratings/${id}`, data);

export const deleteRating = (id: string) =>
  axiosInstance.delete(`/api/Ratings/${id}`);
