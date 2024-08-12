import { useState, useContext, useEffect } from "react";
import s from "./taskmodal.module.scss";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import NewCategoryForm from "./components/NewCategoryForm/NewCategoryForm";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import { DataContext } from "../../context/DataContext";
import {
  categoryUtilsHandler,
  generalUtilsHandler,
  taskConfigureUtilsHandler,
} from "./utils/utils";
import { ModalPropTypes } from "./types/index";
import { DataFormInputTypes } from "../../types";
import useCreateTask from "../../hooks/api/useCreateTask";
import useUpdateTask from "../../hooks/api/useUpdateTask";

export default function TaskModal({
  visibility,
  setVisibility,
  modalType,
  taskToConfigure,
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

  // api calls - custom hooks
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  // contexts
  const { categories } = useContext(DataContext);

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
    taskToConfigure,
    setValue,
  );

  const onSubmit: SubmitHandler<DataFormInputTypes> = (data) => {
    if (modalType === "configure") {
      updateTask(data, taskToConfigure, setVisibility);
    } else if (modalType === "create") {
      createTask(data, setVisibility);
    }
  };

  // useEffects

  // Reset the form when the modal is opened
  useEffect(() => {
    if (visibility) {
      reset();
    }
  }, [visibility]);

  // the modal is used for both when the user want to configure an exisiting task and to create a new task. Here the form inputs are set when the user want to configre an exisiting task
  useEffect(() => {
    if (modalType !== "configure") return;
    getTaskToConfigureValues();
  }, [visibility]);

  // Set the category as the newly created category if the user chooses to do that.
  useEffect(() => {
    if (newCategoryId) {
      setValue("categoryId", newCategoryId);
    }
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

        {getCompletionCheckbox(modalType, register)}
        <div className={s.form__buttonsWrapper}>
          <DeleteButton
            modalType={modalType}
            setVisibility={setVisibility}
            taskToConfigure={taskToConfigure}
            s={s}
          />

          <button className={getButtonClassName()} type="submit">
            {getSubmitName()}
          </button>
        </div>
      </form>

      <NewCategoryForm
        newCategoryModalOpen={newCategoryModalOpen}
        setNewCategoryModalOpen={setNewCategoryModalOpen}
        onNewCategoryId={(categoryId) => setNewCategoryId(categoryId)}
      />

      {newCategoryModalOpen ? (
        <div
          onClick={() => setNewCategoryModalOpen(false)}
          className={s.hideBackgroundWhenNewCategoryIsOpen}
        ></div>
      ) : null}
    </div>
  );
}

// utils function returning JSX,  might need to put this into a seperate compoent..
function getCompletionCheckbox(
  modalType: string,
  register: UseFormRegister<DataFormInputTypes>,
) {
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
