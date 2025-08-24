import { IPagination } from '@/types/common';
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosError,
} from 'axios'

/**
 * @description: Request results
 */
interface RequestInterceptors<T> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorsCatch?: (err: any) => any
}

/**
 * @description: Request config
 */
interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

/**
 * @description: Axios type definition
 * @param {type}
 * @return {*}
 */
interface IResponse<T> extends AxiosResponse {
  payload: T;
}

export type {
  AxiosResponse,
  AxiosRequestConfig,
  RequestInterceptors,
  RequestConfig,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosError,
  IResponse
}
