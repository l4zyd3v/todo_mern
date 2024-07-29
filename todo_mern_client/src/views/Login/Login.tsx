import { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./login.module.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";

type Inputs = {
  userNameOrEmail: string;
  passWord: string;
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

  const {
    register,
    handleSubmit,
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

  return (
    <main className={s.wrapper}>
      <div className={s.main}>
        <h1 className={s.main__heading1}>Login</h1>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.form__inputWrapper}>
            <label
              className={`${s.form__inputLabel} ${usernameOrEmailFocus ? s.form__inputLabelActive : ""}`}
              htmlFor="usernameOrEmail"
            >
              username/email
            </label>
            <input
              className={s.form__input}
              id="usernameOrEmail"
              {...register("userNameOrEmail", { required: true })}
              onFocus={() => setUserNameOrEmailFocus(true)}
            />
            {errors.userNameOrEmail && (
              <span className={s.form__inputError}>
                <FaArrowLeftLong className={s.form__inputError_arrowIcon} />{" "}
                required
              </span>
            )}
          </div>

          <div className={s.form__inputWrapper}>
            <label
              className={`${s.form__inputLabel} ${passwordFocus ? s.form__inputLabelActive : ""}`}
              htmlFor="password"
            >
              password
            </label>
            <input
              type="password"
              className={s.form__input}
              id="password"
              {...register("passWord", { required: true })}
              onFocus={() => setPasswordFocus(true)}
            />
            {errors.passWord && (
              <span className={s.form__inputError}>
                <FaArrowLeftLong className={s.form__inputError_arrowIcon} />{" "}
                required
              </span>
            )}
          </div>
          <div className={s.form__rememberMeWrapper}>
            <input
              id="rememberMe"
              type="checkbox"
              // checked={rememberMe}
              // onChange={handleRememberMeChange}
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
