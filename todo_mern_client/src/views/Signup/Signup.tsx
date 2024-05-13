import { useForm, SubmitHandler } from "react-hook-form";
import s from "./signup.module.css";
import Input from "./components/Input";
import { Inputs } from "./types";

export default function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.username, data.password);
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
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            }}
            errors={errors}
          />

          <Input
            name="username"
            register={register}
            rules={{
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
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
            }}
            errors={errors}
          />

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
