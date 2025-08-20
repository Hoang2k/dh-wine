import { IPagination } from "@/types/common";
import { IUser } from '@/types/user';

export interface IResponseDataGlobal<IResponseGlobal> {
  data: IResponseGlobal;
}

export interface IResponseGlobal {
  data: IGlobal[];
  meta: IPagination;
}

export interface IGlobal {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  navigation: INavigation;
  footer: IFooter;
  user?: IUser;
}

export interface INavigation {
  id: number;
  links: ILink[];
  leftButton: ILeftButton;
  rightButton: null;
}

export interface IFooter {
  id: number;
  label: string;
  footerColumns: IColumn[];
  socialNetworks: ISocialNetwork[];
  button: ILink;
}

export interface ILink {
  id: number;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
}

export interface ILeftButton {
  id: number;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
}

export interface IColumn {
  id: number;
  links: ILink[];
}

export interface ISocialNetwork {
  id: number;
  name: string;
  href: string;
  target: string;
  isExternal: boolean;
}