import { IncomingMessage, ServerResponse } from "http";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

declare global {
  interface Window {
    __NEXT_PUBLIC_API_URL?: string;
  }
}

export interface IPagination {
  total: number;
  start: number;
  limit: number;
}

export interface IImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseData<T> {
  data: T;
}

export interface CustomIncomingMessage extends IncomingMessage {
  cookies: Partial<{ [key: string]: string }>;
}

export interface CustomContext extends GetServerSidePropsContext<ParsedUrlQuery, any> {
  req: CustomIncomingMessage;
  res: ServerResponse;
  pathname: string;
  AppTree: () => React.ReactNode;
}

export interface IContext {
  slug: string;
  preview: boolean;
  req: any;
}

export interface ILocalizationCommon {
  locale?: string;
  href?: string;
}

export interface Connect {
  id: number;
  position?: Position;
}

export interface Position {
  end: boolean;
}

export interface IFormConnect {
  connect: Connect[];
  disconnect?: Connect[];
}

export interface FileUpload {
  name: string;
  lastModified: number;
  size: number;
  type: string;
}

export interface ErrorApi extends Error {
  response: dataError;
}

export interface dataError {
  data: {
    message: string;
  };
}