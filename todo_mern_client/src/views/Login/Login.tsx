import { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./login.module.css";
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
    console.log(data.userNameOrEmail, data.passWord);

    const response = axios
      .post(`http://${import.meta.env.VITE_HOSTURL}:3000/auth/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
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
    console.log(response);
  };

  return (
    <main className={s.main}>
      <div className={s.wrapper}>
        <h1 className={s.heading}>Login</h1>
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputWrapper}>
            <label
              className={`${s.inputLabel} ${usernameOrEmailFocus ? s.inputlabel_active : ""}`}
              htmlFor="usernameOrEmail"
            >
              username/email
            </label>
            <input
              className={s.input}
              id="usernameOrEmail"
              {...register("userNameOrEmail", { required: true })}
              onFocus={() => setUserNameOrEmailFocus(true)}
            />
            {errors.userNameOrEmail && (
              <span className={s.inputError}>
                <FaArrowLeftLong className={s.errorArrow} /> required
              </span>
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
              type="password"
              className={s.input}
              id="password"
              {...register("passWord", { required: true })}
              onFocus={() => setPasswordFocus(true)}
            />
            {errors.passWord && (
              <span className={s.inputError}>
                <FaArrowLeftLong className={s.errorArrow} /> required
              </span>
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
            <Link to="/signup" className={s.registerBtn_secondText}>
              {" "}
              Register
            </Link>
          </button>
        </form>
      </div>
    </main>
  );
}
