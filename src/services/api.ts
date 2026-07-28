import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';
import { APIResponse } from '../types/api';

export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<APIResponse<T>>(url, config);
    return response.data.data;
  },

  async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.post<APIResponse<T>>(url, data, config);
    return response.data.data;
  },

  async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.put<APIResponse<T>>(url, data, config);
    return response.data.data;
  },

  async patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.patch<APIResponse<T>>(url, data, config);
    return response.data.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<APIResponse<T>>(url, config);
    return response.data.data;
  },

  async upload<T>(url: string, file: File, onProgress?: (percent: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post<APIResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    return response.data.data;
  },
};
