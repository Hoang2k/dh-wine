import { IUserInfo } from "@/types/user"
import { z } from 'zod';

/**
 * Request success status code
 */
export const SUCCESS_CODE = 200

/**
 * Request contentType
 */
export const CONTENT_TYPE = 'application/json'

/**
 * Request timeout
 */
export const REQUEST_TIMEOUT = 60000

/**
 * Do not redirect whitelist
 */
export const NO_REDIRECT_WHITE_LIST = ['/login']

/**
 * Do not reset routing whitelist
 */
export const NO_RESET_WHITE_LIST = ['Redirect', 'Login', 'NoFind', 'Root']

/**
 * Table default filter column setting field
 */
export const DEFAULT_FILTER_COLUMN = ['expand', 'selection']

/**
 * Whether to automatically convert data format according to headers->content-type
 */
export const TRANSFORM_REQUEST_DATA = true

export const DEFAULT_PREPAGE = 12

/**
 * Default user info
 * @type {IUserInfo}
 * @property {IUser} user - User info
 * @property {string} jwt - JWT token
 * @default
 * @example
 */
export const defaultUserInfo: IUserInfo = {
  user: {
    id: 0,
    fullName: '',
    username: '',
    email: '',
    provider: '',
    confirmed: false,
    blocked: false,
    createdAt: '',
    updatedAt: '',
    picture: {
      id: 0,
      name: '',
      alternativeText: '',
      caption: '',
      width: 0,
      height: 0,
      formats: {},
      hash: '',
      ext: '',
      mime: '',
      size: 0,
      url: '',
      previewUrl: '',
      provider: '',
      provider_metadata: {},
      createdAt: '',
      updatedAt: '',
    },
  },
  token:{
    accessToken: '',
    refresh: '',
    accessTokenExpires: '',
    tokenType: '',
  },
}

/**
 * User info schema
 * @type {z.ZodObject}
 * @property {z.ZodObject} user - User info
 */
export const userInfoSchema = z.object({
  user: z.object({
    id: z.number(),
    fullName: z.string(),
    username: z.string(),
    email: z.string(),
    provider: z.string(),
    confirmed: z.boolean(),
    blocked: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    picture: z.object({
      id: z.number(),
      name: z.string(),
      alternativeText: z.string().nullable(),
      caption: z.string().nullable(),
      width: z.number(),
      height: z.number(),
      formats: z.object({}).nullable(),
      hash: z.string(),
      ext: z.string(),
      mime: z.string(),
      size: z.number(),
      url: z.string(),
      previewUrl: z.string().nullable(),
      provider: z.string(),
      provider_metadata: z.object({}).nullable(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }).nullable().optional(),
  }),
  jwt: z.string().nullable(),
});

export const STATUS_SUBSCRIPTION = {
  INACTIVE: 0,
  ACTIVE: 1,
  CANCELED: 2,
  PAST_DUE: 3,
  UNPAID: 4,
  INCOMPLETE: 5,
  INCOMPLETE_EXPIRED: 6,
  TRIAL: 7
}

/**
 * Book visit location options
 */
export const BOOK_VISIT_LOCATIONS = [
  { id: 1, name: "Nghĩa trang Liệt sĩ Vị Xuyên" },
] as const;

/**
 * Book visit type options
 */
export const BOOK_VISIT_TYPES = [
  { id: 1, name: "Cơ quan Đảng, Nhà nước" },
  { id: 2, name: "Mặt trận Tổ quốc Việt Nam và các tổ chức Chính trị - Xã hội" },
  { id: 3, name: "Lực lượng Quân đội" },
  { id: 4, name: "Lực lượng Công an" },
  { id: 5, name: "Thân nhân liệt sĩ" },
  { id: 6, name: "Cựu chiến binh" },
  { id: 7, name: "Cơ sở giáo dục" },
  { id: 11, name: "Cơ quan y tế"},
  { id: 8, name: "Doanh nghiệp, tổ chức kinh tế" },
  { id: 9, name: "Khách nước ngoài" },
  { id: 10, name: "Khách thăm viếng khác" },
] as const;