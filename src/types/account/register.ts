import {IGlobalAccount} from "@/types/account/index";
import { IFormConnect } from "@/types/common";

export interface IRegisterProps {
  global: IGlobalAccount;
  pageData?: any;
  type?: string;
  staticInfo?: {
    termService?: {
      label: string;
      href: string;
      target: string;
    }
  };
}

export type TRegisterSubmit = {
  fullName: string
  password: string
  userName: string
  phone: string
}
