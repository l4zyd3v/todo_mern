import { useState, useContext } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import s from "./login.module.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";

type Inputs = {
  userNameOrEmail: string;
  passWord: string;
  rememberMe?: boolean;
};

// Define a type for the focus state
type FocusState = {
  username?: boolean;
  password?: boolean;
};

export default function Login() {
  const [usernameOrEmailFocus, setUserNameOrEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn, setUserId } =
    useContext(UserLoggedInContext);
  // const [rememberMe, setRememberMe] = useState(false);

  const [formValues, setFormValues] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const response = axios
      .post(`http://${import.meta.env.VITE_HOSTURL}:3000/auth/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Login Successful");
          setUserLoggedIn(true);
          setUserId(res.data.userId);
          navigate("/");
        } else {
          navigate("/signup");
          alert("User not found, please sign up");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getInputLabelClassName(state: boolean) {
    return `${s.form__inputLabel} ${state ? s.form__inputLabelActive : ""}`;
  }

  function renderInputError(error: FieldErrors<Inputs> | undefined) {
    return (
      error && (
        <span className={s.form__inputError}>
          <FaArrowLeftLong className={s.form__inputError_arrowIcon} /> required
        </span>
      )
    );
  }

  return (
    <main className={s.wrapper}>
      <div className={s.main}>
        <h1 className={s.main__heading1}>Login</h1>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.form__inputWrapper}>
            <label className={getInputLabelClassName(usernameOrEmailFocus)}>
              username/email
            </label>
            <input
              className={s.form__input}
              id={"userNameOrEmail"}
              {...register("userNameOrEmail", { required: true })}
              value={formValues.usernameOrEmail}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  usernameOrEmail: e.target.value,
                });
                setValue("userNameOrEmail", e.target.value);
                setUserNameOrEmailFocus(true);
              }}
              onFocus={() => setUserNameOrEmailFocus(true)}
            />
            {renderInputError(errors.userNameOrEmail)}
          </div>

          <div className={s.form__inputWrapper}>
            <label
              className={getInputLabelClassName(passwordFocus)}
              htmlFor="password"
            >
              password
            </label>
            <input
              type="password"
              className={s.form__input}
              id="passWord"
              {...register("passWord", { required: true })}
              value={formValues.password}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  password: e.target.value,
                });
                setValue("passWord", e.target.value);
                setPasswordFocus(true);
              }}
              onFocus={() => setPasswordFocus(true)}
            />
            {renderInputError(errors.passWord)}
          </div>
          <div className={s.form__rememberMeWrapper}>
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              checked={formValues.rememberMe}
              onChange={() =>
                setFormValues({
                  ...formValues,
                  rememberMe: !formValues.rememberMe,
                })
              }
            />
            <label className={s.form__rememberMeLabel} htmlFor="rememberMe">
              remember me
            </label>
          </div>

          <button className={s.form__submit} type="submit">
            Log In
          </button>

          <button
            className={s.form__registerBtn}
            onClick={() => console.log("Register New User")}
          >
            <span className={s.form__registerBtn_firstText}>
              Dont have an account?{" "}
            </span>
            <Link to="/signup" className={s.form__registerBtn_secondText}>
              {" "}
              Register
            </Link>
          </button>
        </form>
      </div>
    </main>
  );
}
