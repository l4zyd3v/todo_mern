import { useForm, SubmitHandler } from "react-hook-form";
import s from "./signup.module.css";
import Input from "./components/Input";
import { Inputs } from "./types";
import axios from "axios";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const signup = async (data: Inputs) => {
    const response = await axios.post("http://localhost:3000/signup", data);

    console.log(response);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signup(data);
    console.log(data);
  };

  async function testFunction() {
    const res = await axios.post("http://localhost:3000/signup", {
      email: "this is a test",
    });
  }

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
            className={s.alreadyHaveAccountBtn}
            onClick={() => console.log("Already have an account? Login")}
          >
            <span className={s.alreadyHaveAccountBtn_firstText}>
              Already have an account?{" "}
            </span>
            <span className={s.alreadyHaveAccountBtn_secondText}> Login</span>
          </button>
          <button
            className={s.alreadyHaveAccountBtn}
            onClick={(e) => testFunction(e)}
            style={{ width: "100px", height: "50px", backgroundColor: "red" }}
          >
            RIZZ!
          </button>
        </form>
      </div>
    </main>
  );
}
