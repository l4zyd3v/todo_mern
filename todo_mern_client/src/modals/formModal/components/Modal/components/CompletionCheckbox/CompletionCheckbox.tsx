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
      <label className={s.form__label} htmlFor="complete">
        mark as complete:
      </label>
      <input
        className={s.form__completionCheckboxInputWrapper__checkboxInput}
        id={"complete"}
        type="checkbox"
        {...register("priority")}
      />
    </div>
  );
}
