import { useState } from "react";
import s from "./input.module.scss";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiLock, CiUnlock } from "react-icons/ci";
import { Inputs } from "../types";

const handlePasskwordIconVisibility = (showPassword: boolean) => {
  console.log("showPassword", showPassword);
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
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
  };
  errors: FieldErrors<Inputs>;
}

export default function Input({ name, register, errors, rules }: InputProps) {
  const [inputFocus, setInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // console.log("validation rule errors_message: " + rules?.pattern?.message);

  console.log("input focus: ", inputFocus);

  return (
    <div className={s.inputWrapper}>
      <label
        className={`${s.inputWrapper__Label} ${inputFocus ? s.inputWrapper__Label_active : ""}`}
        htmlFor={name}
      >
        {name}
      </label>
      <input
        type={showPassword ? "" : name}
        className={s.inputWrapper__input}
        id={name}
        {...register(name, { ...rules })}
        onChange={() => setInputFocus(true)}
      />

      {name === "password" && (
        <button
          className={s.inputWrapper__togglePasswordVisibility}
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
        <span
          className={`${s.inputWrapper__error} ${name === "password" ? s.inputWrapper__error_moveErrorMessageAbit : ""}`}
        >
          <FaArrowLeftLong className={s.inputWrapper__error_arrowIcon} />{" "}
          required
        </span>
      )}
    </div>
  );
}
