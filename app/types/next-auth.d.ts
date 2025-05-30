// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { DefaultSession, DefaultUser, JWT as DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      image: string | null;
      name: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      email: string | null;
      image: string | null;
      name: string | null;
    };
  }
}
