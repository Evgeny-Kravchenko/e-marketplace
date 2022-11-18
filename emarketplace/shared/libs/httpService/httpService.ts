import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpRequestOptions {
  axiosConfig?: AxiosRequestConfig;
}

export interface BaseHttpService {
  get<T>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError>;

  post<T>(
    url: string,
    data?: unknown,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError>;

  put<T>(
    url: string,
    data?: unknown,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError>;

  delete<T>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError>;
}

export class HttpService implements BaseHttpService {
  constructor(private readonly axios: AxiosInstance) {}
  public async get<T>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError> {
    return this.performRequest<T>(() => this.axios.get<T>(url, options?.axiosConfig));
  }

  public async post<T>(
    url: string,
    data?: unknown,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError> {
    return this.performRequest<T>(() =>
      this.axios.post<T>(url, data, options?.axiosConfig)
    );
  }

  public async put<T>(
    url: string,
    data: unknown,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError> {
    return this.performRequest<T>(() =>
      this.axios.put<T>(url, data, options?.axiosConfig)
    );
  }

  public async delete<T>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<AxiosResponse<T> | AxiosError> {
    return this.performRequest<T>(() => this.axios.delete<T>(url, options?.axiosConfig));
  }

  private performRequest<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T> | AxiosError> {
    try {
      return request();
    } catch (err) {
      return this.handleError(err as AxiosError);
    }
  }

  private async handleError(err: AxiosError): Promise<AxiosError> {
    console.error(err);
    return Promise.reject(err);
  }
}
