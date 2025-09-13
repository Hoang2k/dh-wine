import { STATUS_SUBSCRIPTION } from "@/constants"
import { CustomIncomingMessage } from "@/types/common"
import { Fn, Recordable, TimeFormatOptions } from "@/types/global.types"
import { IUserInfo } from "@/types/user"
import { GetServerSidePropsContext, NextPageContext } from "next"

/**
 *
 * @param component Components that need to be registered
 * @param alias Alias
 * @returns any
 */
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: any) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 * @param str CamelCase string that needs to be underlined
 * @returns String underline
 */
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @param str Underlined string that needs to be camelCase
 * @returns String camelCase
 */
export const underlineToHump = (str: string): string => {
  if (!str) return ''
  return str.replace(/\-(\w)/g, (_, letter: string) => {
    return letter.toUpperCase()
  })
}

/**
 * @param str CamelCase string that needs to be underlined
 */
export const humpToDash = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

export const getCssVar = (prop: string, dom = document.documentElement) => {
  return getComputedStyle(dom).getPropertyValue(prop)
}

/**
 * Find a subscript of an array object
 * @param {Array} ary Array
 * @param {Functon} fn Callback
 */
export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn<T>): number => {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: boolean | T = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}

export const trim = (str: string) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * @param {Date | number | string} time Find a subscript of an array object
 * @param {String} fmt The format that needs to be converted is as follows: yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time: Date | number | string, fmt: string): string {
  if (!time) return '';
  
  const date = new Date(time);
  const o: TimeFormatOptions = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k of Object.keys(o)) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? String(o[k as keyof TimeFormatOptions]) : ('00' + o[k as keyof TimeFormatOptions]).substr(('' + o[k as keyof TimeFormatOptions]).length)
      );
    }
  }

  return fmt;
}

/**
 * @param {String} str String that needs to be converted
 */
export function toAnyString() {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString()
  })
  return str
}

/**
 * @param {String} str String that needs to be converted
 */
export function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

/**
 * @param {String} str String that needs to be converted
 */
export function objToFormData(obj: Recordable) {
  const formData = new FormData()
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key])
  })
  return formData
}

/**
 * @description: Get the value of the cookie
 * @param {GetServerSidePropsContext} context
 * @return {NextPageContext} customContext
 * @example: getCookie('name')
 */
export const contextRequest = (context: GetServerSidePropsContext) => {
  const customContext: NextPageContext = {
    ...context,
    req: {
      ...context.req,
      cookies: context.req?.cookies || {},
    } as CustomIncomingMessage,
    pathname: context.resolvedUrl || '',
    AppTree: () => null,
  };

  return customContext;
}

/**
 * @description: Get strapi media url
 * @param {string} name
 * @return {string} url
 */
export const getStrapiMedia = (url: string): string => {
  if (url == null) {
    return '';
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_FILE_URL || 'http://localhost:1337'}${url}`;
}

/**
 * @description: Get strapi url
 * @param {string} path
 * @return {string} url
 */
export const getStrapiURL = (path: string): string => {
  return `${
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
  }/api${path}`;
}




/**
 * @description: Get the session token
 * @return {string} sessionCookie
 */
export const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';


/**
 * @description: Generate random string
 * @param {number} length
 * @return {string} random string
 */
export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => characters[x % characters.length])
    .join('');
};

/**
 * @description: Handle connect line
 * @return {void}
 */
export const handleConnectLine = () => {
  const clientId = process.env.LINE_CONNECT_ID!; 
  const redirectUri = encodeURIComponent(process.env.LINE_REDIRECT_URI || ''); 
  const state = generateRandomString(16); 
  const scope = "profile openid"; 
  const nonce = generateRandomString(16); 
  
    const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&nonce=${nonce}`;

    window.location.href = lineAuthUrl;
    }

/**
 * @description: Format price
 * @param {number} price
 * @return {string} formatted price
 */
export const formatPrice = (price: number) => {
  if (!price) return '0 VND';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
}