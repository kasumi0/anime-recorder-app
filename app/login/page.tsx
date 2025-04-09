"use client";

import styles from "./login.module.css";
import { useState } from "react";
import { Signup } from "./components/Signup";
import { SignIn } from "./components/SignIn";
import { OAuth } from "./components/OAuth";
const { formCard, isSignin, contents } = styles;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const handleCardChange = () => setIsLogin((prev) => !prev);

  return (
    <div className={`${formCard} ${isLogin ? "" : isSignin}`}>
      <div className={contents}>
        <div>
          <h2>Login</h2>
          <SignIn />
          <OAuth />
          <button type="button" onClick={handleCardChange}>
            新規登録
          </button>
        </div>
        <div>
          <Signup />
          <button type="button" onClick={handleCardChange}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}
