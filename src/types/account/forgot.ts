import {IGlobalAccount} from "@/types/account/index";

export interface IChangeForgotProps {
  global: IGlobalAccount;
  code: string;
}

export interface IForgotProps {
  global: IGlobalAccount;
  pageData?: any;
}

export interface IForgotSendProps {
  global: IGlobalAccount;
  pageData?: any;
}

export type TFormChangeSubmit = {
  confirmPassword: string,
  password: string
}
