import request from '@/axios'
import { IResponse } from '@/axios/types'
import { TBookVisit, TBookVisitCreate } from '@/types/book-visit'


export const getBookVisit = async (params: {
  org_name?: string;
  time?: string;
  page?: number;
  pageSize?: number;
}): Promise<IResponse<TBookVisit[] | {
  data: TBookVisit[];
  total: number;
  page: number;
  pageSize: number;
}>> => {
  return request.get<IResponse<TBookVisit[] | {
    data: TBookVisit[];
    total: number;
    page: number;
    pageSize: number;
  }>>({ url: '/book-visit', params: params })
}

export const createBookVisit = async (data: TBookVisitCreate): Promise<IResponse<TBookVisit[]>> => {
  return request.post<IResponse<TBookVisit[]>>({ url: '/book-visit', data: data })
}