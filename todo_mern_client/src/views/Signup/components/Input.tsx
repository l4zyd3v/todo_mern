import { useState } from "react";
import s from "../signup.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";

type Inputs = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
};

type InputProps = {
  name: keyof Inputs;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
};

// const handleInputError = (
//   errors: FieldErrors<Inputs>,
//   inputName: keyof Inputs | undefined,
//   className?: CSSModuleClasses[string],
// ) => {
//   if (inputName === undefined) return;
//
//   if (errors[inputName]) {
//     return (
//       <span className={`${s.inputError} ${className ? s[className] : ""}`}>
//         <FaArrowLeftLong className={s.errorArrow} /> required
//       </span>
//     );
//   }
// };

export default function Input({ name, register, errors }: InputProps) {
  const [inputFocus, setInputFocus] = useState(false);

  console.log(errors);

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
        {...register(name, { required: true })}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
      {errors[name] && (
        <span className={`${s.inputError}`}>
          <FaArrowLeftLong className={s.errorArrow} /> required
        </span>
      )}
    </div>
  );
}
