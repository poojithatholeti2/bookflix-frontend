import axiosInstance from './axiosInstance';

export interface CreateCategoryDto {
  title: string;
}

export interface UpdateCategoryDto {
  title: string;
}

export interface CategoryListParams {
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export const getCategories = (params?: CategoryListParams) =>
  axiosInstance.get('/api/Categories', { params });

export const getCategoryById = (id: string) =>
  axiosInstance.get(`/api/Categories/${id}`);

export const createCategory = (data: CreateCategoryDto) =>
  axiosInstance.post('/api/Categories', data);

export const updateCategory = (id: string, data: UpdateCategoryDto) =>
  axiosInstance.put(`/api/Categories/${id}`, data);

export const deleteCategory = (id: string) =>
  axiosInstance.delete(`/api/Categories/${id}`);
