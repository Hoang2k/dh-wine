import service from '@/axios/service'
import { CONTENT_TYPE } from '@/constants'
import { AxiosRequestConfig } from 'axios'
import { NextPageContext } from 'next'

/**
 * @description: Request
 * @param {AxiosRequestConfig} option
 * @return {*}
 */
const request = async (option: AxiosRequestConfig, context?: NextPageContext) => {
  const { url, method, params, data, headers = {}, responseType } = option

  return service.request({
    url: url,
    method,
    params,
    data: data,
    responseType: responseType,
    headers: {
      'Content-Type': CONTENT_TYPE,
      ...headers
    }
  })
}

export default {
  get: <T = any>(option: AxiosRequestConfig, context?: NextPageContext) => {
    return request({ method: 'get', ...option }, context) as Promise<T>
  },
  post: <T = any>(option: AxiosRequestConfig, context?: NextPageContext) => {
    return request({ method: 'post', ...option }, context) as Promise<T>
  },
  delete: <T = any>(option: AxiosRequestConfig, context?: NextPageContext) => {
    return request({ method: 'delete', ...option }, context) as Promise<T>
  },
  put: <T = any>(option: AxiosRequestConfig, context?: NextPageContext) => {
    return request({ method: 'put', ...option }, context) as Promise<T>
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url)
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest()
  }
}
