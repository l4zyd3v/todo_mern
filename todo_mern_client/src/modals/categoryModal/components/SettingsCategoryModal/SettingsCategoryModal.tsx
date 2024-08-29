import { useContext, useEffect, useState } from "react";
import { ModalVisibilityContext } from "../../../../context/ModalVisibilityContext";
import s from "./settingscategorymodal.module.scss";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { DataContext } from "../../../../context/DataContext";

export default function SettingsCategoryModal() {
  const { selectedCategory } = useContext(DataContext);
  const { categoryModalVisibility } = useContext(ModalVisibilityContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const onSubmit: SubmitHandler = (data) => {};

  useEffect(() => {
    setValue("name", selectedCategory?.name);
    setValue("color", selectedCategory?.color);
  }, [categoryModalVisibility]);

  return (
    <div className={s.settingsCategoryModal}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="name">
            name
          </label>
          <input
            type="name"
            className={s.form__input}
            id={"name"}
            {...register("name", { required: true })}
          />
        </div>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="color">
            color
          </label>
          <input
            type="color"
            className={s.form__input}
            id={"color"}
            {...register("color", { required: true })}
          />
        </div>

        <button type="submit">submit</button>
      </form>
      <button>delete category</button>
    </div>
  );
}
