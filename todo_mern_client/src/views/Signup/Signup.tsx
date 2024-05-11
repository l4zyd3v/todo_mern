import { useState } from "react";
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  FieldError,
} from "react-hook-form";
import s from "./signup.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiLock, CiUnlock } from "react-icons/ci";

type Inputs = {
  eMail: string;
  userName: string;
  firstName: string;
  lastName: string;
  passWord: string;
};

const handlePasskwordIconVisibility = (showPassword: boolean) => {
  return showPassword ? (
    <CiUnlock className={s.togglePasswordVisibility_icons} />
  ) : (
    <CiLock className={s.togglePasswordVisibility_icons} />
  );
};

const handleInputError = (
  errors: FieldErrors<Inputs>,
  inputName: keyof Inputs | undefined,
  className?: CSSModuleClasses[string],
) => {
  if (inputName === undefined) return;

  if (errors[inputName]) {
    return (
      <span className={`${s.inputError} ${className ? s[className] : ""}`}>
        <FaArrowLeftLong className={s.errorArrow} /> required
      </span>
    );
  }
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState({
    username: false,
    password: false,
    eMail: false,
    firstName: false,
    lastName: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(data.userName, data.passWord);

  const toggleShowPassword = (e: React.MouseEvent) => {
    // apparently, the default behavior of a button inside a form is to submit the form.
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <main className={s.main}>
      <div className={s.wrapper}>
        <h1 className={s.heading}>Signup</h1>
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${inputFocus.eMail ? s.inputlabel_active : ""}`}
              htmlFor="email"
            >
              email
            </label>
            <input
              type="email"
              className={s.input}
              id="email"
              {...register("eMail", { required: true })}
              onFocus={() =>
                setInputFocus((prevState) => ({ ...prevState, eMail: true }))
              }
              onBlur={() =>
                setInputFocus((prevState) => ({ ...prevState, eMail: true }))
              }
            />
            {handleInputError(errors, "eMail")}
          </div>

          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${inputFocus.username ? s.inputlabel_active : ""}`}
              htmlFor="username"
            >
              username
            </label>
            <input
              type="text"
              className={s.input}
              id="username"
              {...register("userName", { required: true })}
              // onFocus={() => setUserNameFocus(true)}
              // onChange={() => setUserNameFocus(true)}
              // here
              onFocus={() =>
                setInputFocus((prevState) => ({ ...prevState, username: true }))
              }
              onBlur={() =>
                setInputFocus((prevState) => ({ ...prevState, username: true }))
              }
            />
            {handleInputError(errors, "userName")}
          </div>

          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${inputFocus.firstName ? s.inputlabel_active : ""}`}
              htmlFor="firstname"
            >
              firstname
            </label>
            <input
              type="text"
              className={s.input}
              id="firstname"
              {...register("firstName", { required: true })}
              onFocus={() =>
                setInputFocus((prevState) => ({
                  ...prevState,
                  firstName: true,
                }))
              }
              onBlur={() =>
                setInputFocus((prevState) => ({
                  ...prevState,
                  firstName: true,
                }))
              }
            />
            {handleInputError(errors, "firstName")}
          </div>

          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${inputFocus.lastName ? s.inputlabel_active : ""}`}
              htmlFor="lastname"
            >
              lastname
            </label>
            <input
              type="text"
              className={s.input}
              id="lastname"
              {...register("lastName", { required: true })}
              onFocus={() =>
                setInputFocus((prevState) => ({
                  ...prevState,
                  lastName: true,
                }))
              }
              onBlur={() =>
                setInputFocus((prevState) => ({
                  ...prevState,
                  lastName: true,
                }))
              }
            />
            {handleInputError(errors, "lastName")}
          </div>

          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${inputFocus.password ? s.inputlabel_active : ""}`}
              htmlFor="password"
            >
              password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={s.input}
              id="password"
              {...register("passWord", { required: true })}
              onFocus={() =>
                setInputFocus((prevState) => ({
                  ...prevState,
                  password: true,
                }))
              }
              onBlur={() =>
                setInputFocus((prevState) => ({
                  ...prevState,
                  password: true,
                }))
              }
            />
            <button
              className={s.togglePasswordVisibility}
              type="button"
              onClick={toggleShowPassword}
            >
              {handlePasskwordIconVisibility(showPassword)}
            </button>
            {handleInputError(errors, "passWord", "moveErrorMessageAbit")}
          </div>

          <button className={s.submit} type="submit">
            Create Account
          </button>

          <button
            className={s.alreadyHaveAccountBtn}
            onClick={() => console.log("Already have an account? Login")}
          >
            <span className={s.alreadyHaveAccountBtn_firstText}>
              Already have an account?{" "}
            </span>
            <span className={s.alreadyHaveAccountBtn_secondText}> Login</span>
          </button>
        </form>
      </div>
    </main>
  );
}
