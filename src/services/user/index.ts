import request from '@/axios'
import { IResponse } from '@/axios/types';
import { defaultUserInfo } from '@/constants';
import { FormLogin } from '@/types/account/login';
import { TRegisterSubmit } from '@/types/account/register';
import { IUser, IUserInfo } from '@/types/user';

/**
 * @description: Login user
 * @param {FormLogin} params
 * @return {*}
 */
export const postLogin = async (params: FormLogin): Promise<IResponse<IUserInfo>> => {
  return request.post<IResponse<IUserInfo>>({ url: '/v1/users/login', data: params});
}


/**
 * @description: Register user
 * @param {TRegisterSubmit} params
 * @return {*}
 */
export const postRegister = async (params: TRegisterSubmit): Promise<IResponse<IUserInfo>> => {
  return request.post<IResponse<IUserInfo>>({ url: '/v1/users/register', data: params });
}

/**
 * @description: Get me
 * @param {string} jwt
 * @return {*}
 */
export const getMe = async (): Promise<IResponse<IUserInfo>> => {
    return request.get<IResponse<IUserInfo>>({ url: '/v1/users/me' });
}


/**
 * @description: Get list users
 * @return {*}
 */
export const getListUsers = async (): Promise<IResponse<any>> => {
    return request.get<IResponse<any>>({ url: '/users' });
}

/**
 * @description: Get list posts
 * @return {*}
 */
export const getListPosts = async (): Promise<any> => {
    return request.get<any>({ url: '/posts' });
}

/**
 * @description: Get post detail by ID
 * @param {string} id
 * @return {*}
 */
export const getPostDetail = async (id: string): Promise<any> => {
    return request.get<any>({ url: `/posts/${id}` });
}
