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
import Input from "./components/Input";

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

type Inputs = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
};

// type InputFocus = {
//   [K in keyof Inputs]: boolean;
// };

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const [inputFocus, setInputFocus] = useState<InputFocus>({
  //   username: false,
  //   password: false,
  //   email: false,
  //   firstname: false,
  //   lastname: false,
  // });
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(data.username, data.password);

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
          <Input name="email" register={register} errors={errors} />
          <Input name="username" register={register} errors={errors} />
          <Input name="firstname" register={register} errors={errors} />
          <Input name="lastname" register={register} errors={errors} />

          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${passwordInputFocus ? s.inputlabel_active : ""}`}
              htmlFor="password"
            >
              password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={s.input}
              id="password"
              {...register("password", { required: true })}
              onFocus={() => setPasswordInputFocus(true)}
              onBlur={() => setPasswordInputFocus(true)}
            />
            <button
              className={s.togglePasswordVisibility}
              type="button"
              onClick={toggleShowPassword}
            >
              {handlePasskwordIconVisibility(showPassword)}
            </button>
            {handleInputError(errors, "password", "moveErrorMessageAbit")}
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
