

export interface IUserInfo {
	user: IUser;
	token: IToken;
}

export interface IToken {
	accessToken: string;
	refresh: string;
	accessTokenExpires: string;
	tokenType: string;
  }

export interface IResponseDataLogin {
	data: IUserInfo;
}

export interface IPlan {
  id: number;
  btn_check_subscription: string;
}

export interface IUser {
	id: number;
	fullName: string;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	picture?: IPicture | null;
	jwt?: string | null;
	line_id?: string | null;
	first_login?: boolean | null;
}

export interface IPicture {
	id: number;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: any | null;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string | null;
	provider_metadata: any | null;
	createdAt: string;
	updatedAt: string;
}
export interface IJwtSocial {
	name: string;
	email: string;
	picture: string;
	sub: string;
}

export interface IAccountSocial {
	provider: string;
	type: string;
	providerAccountId: string;
	access_token: string;
	expires_at: number;
	scope: string;
	token_type: string;
	id_token: string;
}

export interface ISession {
	token: string;
	user: IUser;
	jwt: string;
	expires: string;
}
