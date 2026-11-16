import request from '@/axios'
import { IResponse } from '@/axios/types'
import { TCreateFeedback } from '@/types/feedback'


export const createFeedback = async (body: TCreateFeedback): Promise<any> => {
  return await request.post<any>({ url: '/feedback/create', data: body })
}