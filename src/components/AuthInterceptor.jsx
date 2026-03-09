import { useEffect } from 'react';
import { useAuth } from '@clerk/react';
import axiosInstance from '../utils/axiosInstance';

const AuthInterceptor = ({ children }) => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error fetching Clerk token:', error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return children;
};

export default AuthInterceptor;
