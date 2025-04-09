export type AuthErrors = {
  email?: string[];
  password?: string[];
};

export type AuthState = {
  email: string;
  password: string;
  errors: AuthErrors;
  success?: boolean;
};
