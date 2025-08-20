import { NextPageContext } from "next";
import { CustomContext } from "@/types/common";

export type Recordable = {
  [key: string]: any;
};

export type Fn<T> = (item: T, index: number, array: Array<T>) => boolean;

export type TimeFormatOptions = {
  'M+': number;
  'd+': number;
  'H+': number;
  'm+': number;
  's+': number;
  'q+': number;
  S: number;
};

//Expected 1-2 arguments, but got 4.ts(2554)

export type ParamGet = {
  populate?: any;
  filters?: any;
  sort?: any;
  start?: number;
  limit?: number;
  locale?: string;
  pagination?: any;
  slug?: string;
  preview?: string;
  id?: number;
}

export type Pagination = {
  start?: number;
  limit?: number;
}

export type GlobalContext = NextPageContext & CustomContext;
