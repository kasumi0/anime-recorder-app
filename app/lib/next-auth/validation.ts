import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z.string().min(6, { message: "パスワードは6文字以上必要です" }),
});

export type AuthSchema = z.infer<typeof authSchema>;
