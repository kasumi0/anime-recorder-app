"use server";

import { authSchema } from "@/app/lib/next-auth/validation";
import { AuthState } from "./types";

export async function handleSignin(_: AuthState, formData: FormData): Promise<AuthState> {
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

  return {
    email: result.data.email,
    password: result.data.password,
    errors: {},
  };
}
