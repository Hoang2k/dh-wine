import request from '@/axios'
import { IResponse } from '@/axios/types'
import { Grave } from '@/types/graves'


export const getGraves = async (params:any): Promise<IResponse<Grave[]>> => {
  return await request.get<IResponse<Grave[]>>({ url: '/graves', params: params })
}