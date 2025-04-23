import { useActionState, useEffect } from "react";
import { handleSignup } from "../actions/signup";
import styles from "../login.module.css";
import { signIn } from "next-auth/react";
const { errorText } = styles;

export const Signup = () => {
  const [state, formAction] = useActionState(handleSignup, {
    email: "",
    password: "",
    errors: {},
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      signIn("credentials", {
        email: state.email,
        password: state.password,
        redirect: true,
        callbackUrl: "/",
      });
    }
  }, [state]);

  return (
    <>
      <h2>SignUp</h2>
      <form action={formAction}>
        <div>
          <label>
            <input type="text" placeholder=" " name="email" />
            <span>email</span>
          </label>
          {state.errors?.email && (
            <p className={errorText}>{state.errors.email}</p>
          )}
        </div>
        <div>
          <label>
            <input type="password" placeholder=" " name="password" />
            <span>password</span>
          </label>
          {state.errors?.password && (
            <p className={errorText}>{state.errors.password}</p>
          )}
        </div>
        <button>新規登録</button>
      </form>
    </>
  );
};
