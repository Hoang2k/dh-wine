import request from '@/axios'
import { IResponse } from '@/axios/types'
import { IProduct } from '@/types/products'


/**
 * @description: Get all product
 * @return {*}
 */
export const getAllProduct = async (): Promise<IResponse<IProduct[]>> => {
  return request.get<IResponse<IProduct[]>>({ url: '/v1/products' })
}


