import { useContext, useEffect, useState } from "react";
import { ModalVisibilityContext } from "../../../../context/ModalVisibilityContext";
import s from "./settingscategorymodal.module.scss";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { DataContext } from "../../../../context/DataContext";
import { IoIosCloseCircle } from "react-icons/io";

type SettingsCategoryTypes = {
  settingsVisibility: boolean;
  setSettingsVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsCategoryModal({
  settingsVisibility,
  setSettingsVisibility,
}: SettingsCategoryTypes) {
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

  if (!settingsVisibility) return null;

  return (
    <div className={s.settingsCategoryModal}>
      <IoIosCloseCircle
        onClick={() => setSettingsVisibility(false)}
        className={s.settingsCategoryModal__exitBtn}
      />
      <h3 className={s.settingsCategoryModal__heading}>configure</h3>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form__inputsWrapper}>
          <input
            type="name"
            className={`${s.form__inputs} ${s.form__nameInput}`}
            id={"name"}
            {...register("name", { required: true })}
          />
          <input
            type="color"
            className={`${s.form__inputs} ${s.form__colorInput}`}
            id={"color"}
            {...register("color", { required: true })}
          />
        </div>
        <div className={s.buttonWrapper}>
          <button
            className={`${s.buttonWrapper__deleteBtn} ${s.buttonWrapper__buttons}`}
          >
            delete category
          </button>
          <button
            className={`${s.buttonWrapper__submitBtn} ${s.buttonWrapper__buttons}`}
            type="submit"
          >
            done
          </button>
        </div>
      </form>
      <div className={s.settingsCategoryModal__forGroundOverlay}></div>
    </div>
  );
}
