import axiosInstance from './axiosInstance';

export interface RegisterRequestDto {
  emailAddress: string;
  password: string;
  roles?: string[];
}

export interface LoginRequestDto {
  userName: string;
  password: string;
}

export const register = (data: RegisterRequestDto) =>
  axiosInstance.post('/api/Auth/Register', data);

export const login = (data: LoginRequestDto) =>
  axiosInstance.post('/api/Auth/Login', data);
