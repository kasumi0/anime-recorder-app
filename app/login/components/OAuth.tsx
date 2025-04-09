import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getProviders, signIn } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { handleLogin } from "../actions/login";
import styles from "../login.module.css";
const { buttons } = styles;

type Provider = Awaited<ReturnType<typeof getProviders>>;

export const OAuth = () => {
  const [providers, setProviders] = useState<Provider | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const [, formAction] = useActionState(handleLogin, {
    email: "",
    password: "",
    errors: {},
  });

  return (
    <form action={formAction}>
      <h3>Or Sign up Using</h3>
      <div className={buttons}>
        {providers &&
          Object.values(providers).map((provider) =>
            provider.id === "credentials" ? null : (
              <button
                type="button"
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                {provider.id === "github" && <FaGithub />}
                {provider.id === "google" && <FcGoogle />}
              </button>
            )
          )}
      </div>
    </form>
  );
};
