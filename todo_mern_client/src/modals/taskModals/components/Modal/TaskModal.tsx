import { useState, useContext, useEffect } from "react";
import s from "./taskmodal.module.scss";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import {
  DeleteButton,
  NewCategoryForm,
  DeleteConfirmModal,
  CompletionCheckbox,
} from "./components/index";
import { DataContext } from "../../../../context/DataContext";
import {
  categoryUtilsHandler,
  generalUtilsHandler,
  taskConfigureUtilsHandler,
} from "./utils/utils";
import { ModalPropTypes } from "./types/index";
import { DataFormInputTypes, UpdateTaskProps } from "../../../../types";
import useCreateTask from "../../../../hooks/api/useCreateTask";
import useUpdateTask from "../../../../hooks/api/useUpdateTask";

export default function TaskModal({
  visibility,
  setVisibility,
  modalType,
}: ModalPropTypes) {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<DataFormInputTypes>();

  // states
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);
  const [deleteTaskConfirm, setDeleteTaskConfirm] = useState<boolean | null>(
    null,
  );

  // api calls - custom hooks
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  // contexts
  const { categories, selectedTask } = useContext(DataContext);

  // utils
  const {
    getCategoryOptionValues,
    getDefaultCategoryId,
    getCategoryModalVisibilityClassName,
  } = categoryUtilsHandler(categories, newCategoryModalOpen, s);
  const {
    getModalClassName,
    getFormClassName,
    getSubmitName,
    getButtonClassName,
  } = generalUtilsHandler(visibility, s, modalType);
  const { getTaskToConfigureValues } = taskConfigureUtilsHandler(
    selectedTask,
    setValue,
  );

  const onSubmit: SubmitHandler<DataFormInputTypes> = (data) => {
    if (modalType === "configure") {
      console.log(data);
      updateTask({ data, setVisibility });
    } else if (modalType === "create") {
      createTask(data, setVisibility);
    }
  };

  // useEffects

  useEffect(() => {
    setDeleteTaskConfirm(null);
    setNewCategoryModalOpen(false);
    // Reset the form when the modal is opened
    if (visibility) {
      reset();
    }

    // the modal is used for both when the user want to configure an exisiting task and to create a new task. Here the form inputs are set when the user want to configre an exisiting task
    if (modalType !== "configure" || !selectedTask) return;
    getTaskToConfigureValues();
  }, [visibility]);

  // Set the category as the newly created category if the user chooses to do that.
  useEffect(() => {
    if (!newCategoryId) return;
    setValue("categoryId", newCategoryId);
  }, [newCategoryId, setValue]);

  // set the default categoryValue to be "personal" when creating a new task
  useEffect(() => {
    if (getDefaultCategoryId && !newCategoryId && modalType !== "configure") {
      setValue("categoryId", getDefaultCategoryId());
    }
  }, [getDefaultCategoryId, setValue]);

  return (
    <div className={getModalClassName()}>
      <button
        className={s.Modal__exitButton}
        onClick={() => setVisibility(false)}
      >
        &times;
      </button>
      <form className={getFormClassName()} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className={s.form__input}
            id={"title"}
            {...register("title", { required: true })}
          />
        </div>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="description">
            description
          </label>
          <textarea
            style={{ resize: "none" }}
            className={s.form__input}
            id={"description"}
            {...register("description")}
          ></textarea>{" "}
        </div>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="dueDate">
            due date
          </label>
          <input
            type="date"
            className={s.form__input}
            id={"dueDate"}
            {...register("dueDate")}
          />
        </div>
        <div className={`${s.form__inputWrapper} ${s.inputWrapperCategory}`}>
          <label
            className={`${s.form__label} ${s.inputWrapperCategory__label}`}
            htmlFor="categoryId"
          >
            category
          </label>
          <select
            className={`${s.form__select} ${s.inputWrapperCategory__select}`}
            id={"categoryId"}
            {...register("categoryId", { required: true })}
          >
            {getCategoryOptionValues().map((option) => (
              <option key={option.key} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setNewCategoryModalOpen(!newCategoryModalOpen)}
            type="button"
            className={`${s.form__createNewCategoryButton} ${s.inputWrapperCategory__button}`}
          >
            new
          </button>

          <div
            className={`${s.newCategoryModal} ${getCategoryModalVisibilityClassName()}`}
          ></div>
        </div>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="priority">
            priority
          </label>
          <select
            className={s.form__select}
            id={"priority"}
            {...register("priority")}
          >
            <option value="">Choose priority</option>

            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>

        <CompletionCheckbox modalType={modalType} register={register} s={s} />

        <div className={s.form__buttonsWrapper}>
          <DeleteButton
            modalType={modalType}
            s={s}
            setDeleteTaskConfirm={setDeleteTaskConfirm}
          />

          <button className={getButtonClassName()} type="submit">
            {getSubmitName()}
          </button>
        </div>
      </form>

      <DeleteConfirmModal
        deleteTaskConfirm={deleteTaskConfirm}
        setDeleteTaskConfirm={setDeleteTaskConfirm}
        modalType={modalType}
        setVisibility={setVisibility}
      />

      <NewCategoryForm
        newCategoryModalOpen={newCategoryModalOpen}
        setNewCategoryModalOpen={setNewCategoryModalOpen}
        onNewCategoryId={(categoryId) => setNewCategoryId(categoryId)}
      />

      {newCategoryModalOpen || deleteTaskConfirm ? (
        <div
          onClick={() => {
            setNewCategoryModalOpen(false);
            setDeleteTaskConfirm(false);
          }}
          className={s.hideBackgroundWhenNewCategoryIsOpen}
        ></div>
      ) : null}
    </div>
  );
}
