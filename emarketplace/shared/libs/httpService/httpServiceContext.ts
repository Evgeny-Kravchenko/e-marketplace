import { AxiosInstance } from 'axios';
import { createContext, useContext, useMemo } from 'react';
import { HttpService, BaseHttpService } from './httpService';

export const AxiosContext = createContext<AxiosInstance | null>(null);

export function useAxios(): AxiosInstance {
  const axios = useContext(AxiosContext);
  if (axios === null)
    throw new Error('AxiosContext.Provider is not set in the React component tree.');
  return axios;
}

export function useHttpClient(): BaseHttpService {
  const axios = useAxios();

  const httpClient = useMemo<BaseHttpService>(
    () => {
      return new HttpService(axios);
    },
    /* The http client must only be created once so that it can safely be used in useEffect hooks.
     * axios is also only created once, thus it is safe
     * to use an empty array here. Services that might change like t or notification service
     * will be assigned to the 'mutable' part of httpClient.
     */
    []
  );
  return httpClient;
}
