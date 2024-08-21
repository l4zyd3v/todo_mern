import { useContext, useState, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { DataFormInputTypes, TasksInterface } from "../../../../../../types";
import { DataContext } from "../../../../../../context/DataContext";

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
  const { selectedTask } = useContext(DataContext);
  const [defaultCheckedValue, setDefaultCheckedValue] =
    useState<boolean>(false);

  useEffect(() => {
    if (!selectedTask) return;
    setDefaultCheckedValue(selectedTask.completed);
  }, [selectedTask, setDefaultCheckedValue]);

  if (modalType !== "configure") return null;
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
        defaultChecked={defaultCheckedValue}
      />
    </div>
  );
}
