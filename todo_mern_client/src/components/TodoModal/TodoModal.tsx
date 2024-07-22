import { useState } from "react";
import s from "./todomodal.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { CategoryCardInterface } from "../../types";
import NewCategoryForm from "./components/NewCategoryForm/NewCategoryForm";

// This type should maybe be used in a separate file
type TodoModalProps = {
  visibility: boolean | null;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
  categories: Array<CategoryCardInterface>;
};

export default function TodoModal({
  visibility,
  setVisibility,
  categories,
}: TodoModalProps) {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createTask = async (data) => {
    const response = await axios
      .post(``, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
        }
      });

    console.log(response);
  };

  const onSubmit: SubmitHandler = (data) => {
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

  return (
    <div
      className={`${s.todoModal} ${visibility ? s.modalVisible : visibility === false ? s.modalHide : ""}`}
    >
      <button className={s.exitButton} onClick={() => setVisibility(false)}>
        &times;
      </button>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          <label className={s.label} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className={s.input}
            id={"title"}
            {...register("title", { required: true })}
          />
        </div>
        <div className={s.inputWrapper}>
          <label className={s.label} htmlFor="description">
            description
          </label>
          <textarea
            style={{ resize: "none" }}
            className={s.input}
            id={"description"}
            {...register("description")}
          ></textarea>{" "}
        </div>

        <div className={s.inputWrapper}>
          <label className={s.label} htmlFor="dueDate">
            due date
          </label>
          <input
            type="date"
            className={s.input}
            id={"dueDate"}
            {...register("dueDate")}
          />
        </div>
        <div className={`${s.inputWrapper} ${s.inputWrapperCategory}`}>
          <label className={s.label} htmlFor="category">
            category
          </label>
          <select className={s.select} id={""} {...register("category")}>
            <option>Choose category</option>

            {getCategoryOptions()}
          </select>
          <button
            onClick={() => setNewCategoryModalOpen(!newCategoryModalOpen)}
            type="button"
          >
            new
          </button>

          <div
            className={`${s.newCategoryModal} ${newCategoryModalOpen ? s.newCategoryModalOpen : ""}`}
          >
            <button
              style={{ position: "absolute", top: "10rem", right: "5rem" }}
              onClick={() => setNewCategoryModalOpen(false)}
            >
              close
            </button>
            <NewCategoryForm />
          </div>
        </div>
        <div className={s.inputWrapper}>
          <label className={s.label} htmlFor="priority">
            priority
          </label>
          <select
            className={s.select}
            id={"priority"}
            {...register("priority")}
          >
            <option>Choose priority</option>

            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <button className={s.submit} type="submit">
          Create Task
        </button>
      </form>
      {newCategoryModalOpen ? (
        <div
          onClick={() => setNewCategoryModalOpen(false)}
          className={s.hideBackgroundWhenNewCategoryIsOpen}
        ></div>
      ) : null}
    </div>
  );
}
