import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ModalVisibilityContext } from "../../../../context/ModalVisibilityContext";
import s from "./settingscategorymodal.module.scss";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { DataContext } from "../../../../context/DataContext";
import { IoIosCloseCircle } from "react-icons/io";
import ConfirmDeletionWithTasks from "./components/ConfirmDeletionWithTasks/ConfirmDeletionWithTasks";
import ConfirmDeletionNoTasks from "./components/ConfirmDeletionNoTasks/ConfirmDeletionNoTasks";
import useDeleteCategory from "../../../../hooks/api/useDeleteCategory";

export default function SettingsCategoryModal() {
  const { selectedCategory } = useContext(DataContext);
  const {
    categoryModalVisibility,
    categorySettingsVisibility,
    setCategorySettingsVisibility,
  } = useContext(ModalVisibilityContext);
  const [deleteCatWidthTasks, setDeleteCatWithTasks] = useState(false);
  const [deleteCatNoTasks, setDeleteCatNoTasks] = useState(false);

  const deleteCategory = useDeleteCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    setDeleteCatNoTasks(false);
    setDeleteCatWithTasks(false);
  }, [categorySettingsVisibility, setCategorySettingsVisibility]);

  const onSubmit: SubmitHandler = async (data) => {
    if (deleteCatNoTasks) {
      deleteCategory(setCategorySettingsVisibility);
    }
  };

  useEffect(() => {
    setValue("name", selectedCategory?.name);
    setValue("color", selectedCategory?.color);
  }, [categoryModalVisibility]);

  async function checkTasks() {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_HOSTURL}:3000/categories/${selectedCategory?._id}/checktasks`,
        {
          withCredentials: true,
        },
      );
      const hasTasks = response.data.hasTasks;

      if (hasTasks) {
        setDeleteCatWithTasks(true);
      } else {
        setDeleteCatNoTasks(true);
      }
    } catch (error) {
      console.error("An error occurred while checking for tasks: ", error);
    }
  }

  if (!categorySettingsVisibility) return null;

  return (
    <div className={s.settingsCategoryModal}>
      <IoIosCloseCircle
        onClick={() => setCategorySettingsVisibility(false)}
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
            type="button"
            onClick={() => checkTasks()}
            className={`${s.buttonWrapper__deleteBtn} ${s.buttonWrapper__buttons}`}
          >
            delete category
          </button>
          <button
            className={`${s.buttonWrapper__submitBtn} ${s.buttonWrapper__buttons}`}
            type="button"
          >
            done
          </button>
        </div>
        {deleteCatWidthTasks ? (
          <ConfirmDeletionWithTasks />
        ) : deleteCatNoTasks ? (
          <ConfirmDeletionNoTasks
            deleteCatNoTasks={deleteCatNoTasks}
            setDeleteCatNoTasks={setDeleteCatNoTasks}
          />
        ) : null}
      </form>
      {deleteCatNoTasks || deleteCatWidthTasks ? (
        <div className={s.settingsCategoryModal__forGroundOverlay}></div>
      ) : null}
    </div>
  );
}
