import { UseFormRegister } from "react-hook-form";
import { DataFormInputTypes } from "../../../../../../types";

interface CompletionCheckboxProps {
  modalType: string;
  register: UseFormRegister<DataFormInputTypes>;
  s: CSSModuleClasses;
}

export default function CompletionCheckbox({
  modalType,
  register,
  s,
}: CompletionCheckboxProps) {
  if (modalType !== "configure") return;

  return (
    <div className={s.form__completionCheckboxInputWrapper}>
      <label className={s.form__label} htmlFor="completed">
        mark as complete:
      </label>
      <input
        className={s.form__completionCheckboxInputWrapper__checkboxInput}
        id={"completed"}
        type="checkbox"
        {...register("completed")}
      />
    </div>
  );
}
