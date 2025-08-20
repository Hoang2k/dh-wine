import {IGlobalAccount} from "@/types/account/index";

export interface ILoginProps {
  global: IGlobalAccount;
  pageData?: any;
  type?: string;
  staticInfo?: {
    termService?: {
      label: string;
      href: string;
      target: string;
    }
  }
}

export type TFormSubmit = {
  username: string,
  password: string
}

export type FormLogin = {
  userName: string;
  password: string;
}
