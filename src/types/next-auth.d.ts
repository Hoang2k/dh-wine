import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id?: string;
    jwt?: string;
    [key: string]: any;
  }
  

  interface Session {
    user: {
      id?: string;
      jwt?: string;
      [key: string]: any;
    }
    jwt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: any;
    id?: string;
    jwt?: string;
  }
}