import { useActionState, useEffect } from "react";
import styles from "../login.module.css";
import { handleSignin } from "../actions/signin";
import { signIn } from "next-auth/react";
const { errorText } = styles;

export const SignIn = () => {
  const [state, formAction] = useActionState(handleSignin, {
    email: "",
    password: "",
    errors: {},
  });

  useEffect(() => {
    if (state.email && state.password) {
      signIn("credentials", {
        redirect: true,
        email: state.email,
        password: state.password,
        callbackUrl: "/",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div>
        <label>
          <input type="text" placeholder=" " name="email" />
          <span>email</span>
        </label>
        {state.errors.email && (
          <p className={errorText}>{state.errors.email}</p>
        )}
      </div>

      <div>
        <label>
          <input type="password" placeholder=" " name="password" />
          <span>password</span>
        </label>
        {state.errors.password && (
          <p className={errorText}>{state.errors.password}</p>
        )}
      </div>

      <button>Login</button>
    </form>
  );
};
