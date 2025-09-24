import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      tipoUsuario: string;
    } & DefaultSession["user"];
  };

  interface User extends DefaultUser {
    id: string;
    tipoUsuario: string;
  };
};

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    tipoUsuario: string;
  };
};