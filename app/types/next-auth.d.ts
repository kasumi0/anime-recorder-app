import { DefaultSession, DefaultUser, JWT as DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      image: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      email: string | null;
      image: string | null;
    };
  }
}
