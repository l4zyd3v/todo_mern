import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./signin.module.css";

type Inputs = {
  userName: string;
  passWord: string;
};

// Define a type for the focus state
type FocusState = {
  username?: boolean;
  password?: boolean;
};

export default function SignIn() {
  const [usernameFocus, setUserNameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(data.userName, data.passWord);

  return (
    <main className={s.main}>
      <div className={s.wrapper}>
        <h1 className={s.heading}>Login</h1>
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${usernameFocus ? s.inputlabel_active : ""}`}
              htmlFor="username"
            >
              username
            </label>
            <input
              className={s.input}
              id="username"
              {...register("userName", { required: true })}
              onFocus={() => setUserNameFocus(true)}
            />
            {errors.userName && (
              <span className={s.inputError}>Username is required</span>
            )}
          </div>

          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${passwordFocus ? s.inputlabel_active : ""}`}
              htmlFor="password"
            >
              password
            </label>
            <input
              className={s.input}
              id="password"
              {...register("passWord", { required: true })}
              onFocus={() => setPasswordFocus(true)}
            />
            {errors.passWord && (
              <span className={s.inputError}>Password is required</span>
            )}
          </div>
          <div className={s.rememberMeWrapper}>
            <input
              className={s.rememberMeBtn}
              id="rememberMe"
              type="checkbox"
              // checked={rememberMe}
              // onChange={handleRememberMeChange}
            />
            <label className={s.rememberMeLabel} htmlFor="rememberMe">
              remember me
            </label>
          </div>
          <button className={s.submit} type="submit">
            Log In
          </button>
          <button
            className={s.registerBtn}
            onClick={() => console.log("Register New User")}
          >
            <span className={s.registerBtn_firstText}>
              Dont have an account?{" "}
            </span>
            <span className={s.registerBtn_secondText}> Register</span>
          </button>
        </form>
      </div>
    </main>
  );
}
