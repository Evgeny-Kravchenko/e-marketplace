import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { baseURL } from 'shared/config';

function initializeAxios(): AxiosInstance {
  const configuration: AxiosRequestConfig = {
    baseURL,
  };

  return axios.create(configuration);
}

export const axiosInstance = initializeAxios();
