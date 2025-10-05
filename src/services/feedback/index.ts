import request from '@/axios'
import { IResponse } from '@/axios/types'
import { TCreateFeedback } from '@/types/feedback'
import { Grave } from '@/types/graves'


export const createFeedback = async (body: TCreateFeedback): Promise<any> => {
  return await request.post<any>({ url: '/feedback/create', data: body })
}