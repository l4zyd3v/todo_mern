import { useState, useContext, useEffect } from "react";
import s from "./todomodal.module.scss";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import axios from "axios";
import { CategoryCardInterface, CategoriesInterface } from "../../types";
import NewCategoryForm from "./components/NewCategoryForm/NewCategoryForm";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";

// This type should maybe be used in a separate file
type TodoModalProps = {
  visibility: boolean | null;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
};

type Inputs = {
  title: string;
  description?: string;
  dueDate?: string;
  category?: string;
  priority?: string;
};

export default function TodoModal({
  visibility,
  setVisibility,
}: TodoModalProps) {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const { categories, addTask } = useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const createTask = async (data: Inputs) => {
    if (!userId) {
      console.error("No userId id found");
      return;
    }
    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_HOSTURL}:3000/newtask`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        console.log("Task created successfully");
        addTask(response.data);
        setVisibility(false);
      } else {
        console.log("Failed to create task: ", response.status);
      }

      console.log(response);
    } catch (error) {
      console.error("An error occurred while creating the task: ", error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createTask(data);
    console.log(data);
  };

  console.log(categories);

  function getCategoryOptions() {
    return categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
  }

  function getTodoModalVisibilityClassName() {
    return visibility
      ? s.todoModalVisible
      : visibility === false
        ? s.todoModalHide
        : "";
  }

  function getCategoryModalVisibilityClassName() {
    return newCategoryModalOpen ? s.newCategoryModalOpen : "";
  }

  useEffect(() => {
    if (visibility) {
      // Reset the form when the modal is opened
      reset();
    }
  }, [visibility]);

  return (
    <div className={`${s.todoModal} ${getTodoModalVisibilityClassName()}`}>
      <button
        className={s.todoModal__exitButton}
        onClick={() => setVisibility(false)}
      >
        &times;
      </button>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
            htmlFor="category"
          >
            category
          </label>
          <select
            className={`${s.form__select} ${s.inputWrapperCategory__select}`}
            id={"category"}
            {...register("category")}
          >
            <option>Choose category</option>

            {getCategoryOptions()}
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
            <option>Choose priority</option>

            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <button className={s.form__submit} type="submit">
          Create Task
        </button>
      </form>

      <NewCategoryForm
        newCategoryModalOpen={newCategoryModalOpen}
        setNewCategoryModalOpen={setNewCategoryModalOpen}
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
