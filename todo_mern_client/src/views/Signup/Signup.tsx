import { useForm, SubmitHandler } from "react-hook-form";
import s from "./signup.module.css";
import Input from "./components/Input";
import { Inputs } from "./types";

export default function Login() {
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
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            errors={errors}
          />

          <Input name="username" register={register} errors={errors} />
          <Input name="firstname" register={register} errors={errors} />
          <Input name="lastname" register={register} errors={errors} />
          <Input name="password" register={register} errors={errors} />

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
