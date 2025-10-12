import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { defaultRequestInterceptors, defaultResponseInterceptors } from './config'
import { AxiosInstance, RequestConfig, AxiosResponse } from './types'
import { REQUEST_TIMEOUT } from '@/constants'

// Docker api call handling applies to the client call container api
export const PATH_URL = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_SSR) || process.env.NEXT_PUBLIC_API_URL

const abortControllerMap: Map<string, AbortController> = new Map()

const showToast = (message: string, type: 'error' | 'success' = 'error') => {
  if (typeof window !== 'undefined') {
    import('react-toastify').then((toastify) => {
      if (type === 'error') {
        toastify.toast.error(message);
      } else {
        toastify.toast.success(message);
      }
    }).catch((err) => {
      console.error('Failed to load toast', err);
    });
  }
};


/**
 * @description: Create axios instance
 */
const axiosInstance: AxiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: PATH_URL
})

/**
 * @description: Request interceptor
 * @param {InternalAxiosRequestConfig} config 
 * @return res | Promise<any>
 */
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const controller = new AbortController()
    const { signal } = controller
    config.signal = signal
    const url = config.url || ''
    abortControllerMap.set(url, controller)

    return config 
})

/**
 * @description: Response interceptor
 * @param {AxiosResponse} res
 * @return res | Promise<any>
 */
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || ''
    abortControllerMap.delete(url)

    return res
  },
  (error: AxiosError) => {
    // Only log errors in browser environment to avoid cluttering build logs
    if (typeof window !== 'undefined') {
      console.log('err： ' + error) // for debug
    }
    // ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

/**
 * @description: Request interceptor
 * @param {InternalAxiosRequestConfig} res
 * @return res | Promise<any>
 */
axiosInstance.interceptors.request.use(defaultRequestInterceptors as any)

/**
 * @description: Response interceptor
 * @param {AxiosResponse} res
 * @return res | Promise<any>
 */
axiosInstance.interceptors.response.use(defaultResponseInterceptors)

/**
 * @description: Service
 * @param {RequestConfig} config
 * @return {*}
 */
const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }

      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch(async (err: any) => {
          if (
            (err?.response?.status === 401 || err?.response?.status === 403) &&
            !config.url?.includes("/v1/users/login")
          ) {
            // await logoutUser();
          }

          // Only show toast and log errors in browser environment
          // Skip during build/SSR to avoid cluttering build logs
          if (typeof window !== 'undefined') {
            const errorMessage =
              err?.response?.data?.message || err?.message || "Có lỗi xảy ra";
            showToast(errorMessage, "error");
          }

          reject(err);
        })
    })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest() {
    for (const [_, controller] of abortControllerMap) {
      controller.abort()
    }
    abortControllerMap.clear()
  }
}

export default service
