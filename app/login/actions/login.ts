"use server";

import { signIn } from "next-auth/react";
import { authSchema } from "@/app/lib/next-auth/validation";
import { AuthState } from "./types";

export async function handleLogin( _: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const result = authSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      email: "",
      password: "",
      errors: result.error.flatten().fieldErrors,
    };
  }
  
  const res = await signIn("credentials", {
    redirect: false,
    email: result.data.email,
    password: result.data.password,
    callbackUrl: "/",
  });

  if (res?.error) {
    return { email: "", password: "", errors: { email: ["認証に失敗しました"] }};
  }

  return { email: "", password: "", errors: {} };
}
