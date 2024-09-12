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
import useUpdateCategory from "../../../../hooks/api/useUpdateCategory";

export default function SettingsCategoryModal() {
  const { selectedCategory } = useContext(DataContext);
  const {
    categoryModalVisibility,
    categorySettingsVisibility,
    setCategorySettingsVisibility,
  } = useContext(ModalVisibilityContext);
  const [deleteCatWithTasksModal, setDeleteCatWithTasksModal] = useState(false);
  const [deleteCatNoTasksModal, setDeleteCatNoTasksModal] = useState(false);

  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    setDeleteCatNoTasksModal(false);
    setDeleteCatWithTasksModal(false);
  }, [categorySettingsVisibility, setCategorySettingsVisibility]);

  const onSubmit: SubmitHandler = async (data) => {
    if (deleteCatNoTasksModal) {
      deleteCategory(setCategorySettingsVisibility, "deleteCatNoTasks");
    } else if (deleteCatWithTasksModal) {
      deleteCategory(setCategorySettingsVisibility, "deleteCatWithTasks");
    } else {
      updateCategory(data, setCategorySettingsVisibility);
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
        setDeleteCatWithTasksModal(true);
      } else {
        setDeleteCatNoTasksModal(true);
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
            // onClick={() => setCategorySettingsVisibility(false)}
          >
            done
          </button>
        </div>
        {deleteCatWithTasksModal ? (
          <ConfirmDeletionWithTasks
            setDeleteCatWithTasksModal={setDeleteCatWithTasksModal}
          />
        ) : deleteCatNoTasksModal ? (
          <ConfirmDeletionNoTasks
            deleteCatNoTasks={deleteCatNoTasksModal}
            setDeleteCatNoTasks={setDeleteCatNoTasksModal}
          />
        ) : null}
      </form>
      {deleteCatNoTasksModal || deleteCatWithTasksModal ? (
        <div className={s.settingsCategoryModal__forGroundOverlay}></div>
      ) : null}
    </div>
  );
}
