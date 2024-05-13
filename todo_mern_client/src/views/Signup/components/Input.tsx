import { useState } from "react";
import s from "../signup.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiLock, CiUnlock } from "react-icons/ci";
import { Inputs } from "../types";

const handlePasskwordIconVisibility = (showPassword: boolean) => {
  return showPassword ? (
    <CiUnlock className={s.togglePasswordVisibility_icons} />
  ) : (
    <CiLock className={s.togglePasswordVisibility_icons} />
  );
};

interface InputProps {
  name: keyof Inputs;
  register: UseFormRegister<Inputs>;
  rules?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  errors: FieldErrors<Inputs>;
}

export default function Input({ name, register, errors, rules }: InputProps) {
  const [inputFocus, setInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  console.log("validation rule errors_message: " + rules?.pattern?.message);

  return (
    <div className={s.inputWrapper}>
      <label
        className={`${s.inputLabel} ${inputFocus ? s.inputlabel_active : ""}`}
        htmlFor={name}
      >
        {name}
      </label>
      <input
        type={name}
        className={s.input}
        id={name}
        {...register(name, { required: true, ...rules })}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />

      {name === "password" && (
        <button
          className={s.togglePasswordVisibility}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {handlePasskwordIconVisibility(showPassword)}
        </button>
      )}

      {errors[name] && (
        <span className={`${s.inputError}`}>
          <FaArrowLeftLong className={s.errorArrow} /> required
        </span>
      )}
    </div>
  );
}
