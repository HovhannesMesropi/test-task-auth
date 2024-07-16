import axios from 'axios';
import { toast } from 'react-toastify';
export const initAXIOSInterceptors = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      config.baseURL = 'http://localhost:8080';
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (!response.data.status) {
        if (Array.isArray(response.data.message)) {
          response.data.message.forEach((message: string) =>
            toast.warn(message),
          );
        } else {
          toast.warn(response.data.message);
        }
      }

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 400 && error.response.data.message) {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.forEach((message: string) =>
            toast.warn(message),
          );
        } else {
          toast.warn(error.response.data.message);
        }
      }
      return error;
    },
  );
};
