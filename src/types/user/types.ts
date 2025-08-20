import { ISession } from "@/types/user"
import { pick } from "lodash";

export type FormChangeResetPwd = {
  password: string
  passwordConfirmation: string
  code: string
}

export type FormUpdateUser = {
  fullName?: string;
  username?: string;
  email?: string;
  id?: number;
  url?: string;
  urlAvatar?: string;
  picture?: number;
  line_id?: string;
  first_login?: boolean;
}


export type FormCredentials = Record<"password" | "identifier", string> | undefined;
