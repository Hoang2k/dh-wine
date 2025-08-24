import { AxiosResponse, AxiosRequestConfig } from '@/axios/types'
import qs from 'qs'
import { SUCCESS_CODE, TRANSFORM_REQUEST_DATA } from '@/constants'
import { objToFormData } from '@/utils'

/**
  * @description: Request results
  * @param {InternalAxiosRequestConfig} config
  * @return {*}
  * @param {type}
  * @return {*}
  */
const defaultRequestInterceptors = (config: AxiosRequestConfig) => {
  // Ensure config.headers exists
  config.headers = config.headers || {};

  if (
    config.method === 'post' &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data);
  } else if (
    TRANSFORM_REQUEST_DATA &&
    config.method === 'post' &&
    config.headers['Content-Type'] === 'multipart/form-data' &&
    !(config.data instanceof FormData)
  ) {
    config.data = objToFormData(config.data);
  }

  if (config.method === 'get' && config.params) {
    // Set the paramsSerializer
    config.paramsSerializer = params =>
      qs.stringify(params, { arrayFormat: 'brackets', encode: false });
  }

  return config;
};

/**
  * @description: Request results
  * @param {AxiosResponse} response
  * @return {*}
  * @param {type}
  * @return {*}
  */
const defaultResponseInterceptors = (response: AxiosResponse) => {
  if (response?.config?.responseType === 'blob') {
    return response
  } else {
    return response.data
  }
}

export { defaultResponseInterceptors, defaultRequestInterceptors }
