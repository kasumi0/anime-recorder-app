"use server";

import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { authSchema } from "@/app/lib/next-auth/validation";
import { AuthState } from "./types";

export const handleSignup = async ( _: AuthState, formData: FormData): Promise<AuthState> => {
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

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { email: "", password: "", errors: { email: ["すでに登録されています"] }};
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email: result.data.email, hashedPassword },
  });

  return {
    email: result.data.email,
    password: result.data.password,
    errors: {},
    success: true,
  };
};
