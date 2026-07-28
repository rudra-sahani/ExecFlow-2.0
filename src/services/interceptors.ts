import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';
import { STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/storage';
import { AuthTokens } from '../types/auth';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export function setupInterceptors(onUnauthorized?: () => void): void {
  // Request Interceptor: Attach Access Token
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Auto Refresh on 401
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);

        if (!refreshToken) {
          isRefreshing = false;
          storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
          storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
          storage.remove(STORAGE_KEYS.USER_DATA);
          if (onUnauthorized) onUnauthorized();
          return Promise.reject(error);
        }

        try {
          const { data } = await axiosInstance.post<{ data: AuthTokens }>('/auth/refresh', {
            refreshToken,
          });

          const newTokens = data.data;
          storage.set(STORAGE_KEYS.ACCESS_TOKEN, newTokens.accessToken);
          if (newTokens.refreshToken) {
            storage.set(STORAGE_KEYS.REFRESH_TOKEN, newTokens.refreshToken);
          }

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }

          processQueue(null, newTokens.accessToken);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError, null);
          storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
          storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
          storage.remove(STORAGE_KEYS.USER_DATA);
          if (onUnauthorized) onUnauthorized();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}
