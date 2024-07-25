import { useForm, SubmitHandler } from "react-hook-form";
import s from "./signup.module.css";
import Input from "./components/Input";
import { Inputs } from "./types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const signup = async (data: Inputs) => {
    const response = await axios
      .post(`http://${import.meta.env.VITE_HOSTURL}:3000/auth/signup`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
        }
      });

    console.log(response);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signup(data);
    console.log(data);
  };

  return (
    <main className={s.main}>
      <div className={s.wrapper}>
        <h1 className={s.heading}>Signup</h1>
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            register={register}
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            }}
            errors={errors}
          />

          <Input
            name="username"
            register={register}
            rules={{
              required: true,
              minLength: 3,
            }}
            errors={errors}
          />
          <Input
            name="firstname"
            register={register}
            rules={{
              required: true,
              minLength: 3,
            }}
            errors={errors}
          />
          <Input
            name="lastname"
            register={register}
            rules={{
              required: true,
              minLength: 3,
            }}
            errors={errors}
          />
          <Input
            name="password"
            register={register}
            rules={{
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
            }}
            errors={errors}
          />

          <button className={s.submit} type="submit">
            Create Account
          </button>

          <button
            type="button"
            className={s.alreadyHaveAccountBtn}
            onClick={() => console.log("Already have an account? Login")}
          >
            <span className={s.alreadyHaveAccountBtn_firstText}>
              Already have an account?{" "}
            </span>
            <Link to="/login" className={s.alreadyHaveAccountBtn_secondText}>
              {" "}
              Login
            </Link>
          </button>
        </form>
      </div>
    </main>
  );
}
