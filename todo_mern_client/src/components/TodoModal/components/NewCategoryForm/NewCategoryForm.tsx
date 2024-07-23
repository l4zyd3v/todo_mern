import s from "./newcategoryform.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Props = {
  newCategoryModalOpen: boolean;
  setNewCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewCategoryForm({
  newCategoryModalOpen,
  setNewCategoryModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createCategory = async (data) => {
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
    createCategory(data);
    console.log(data);
  };

  function getVisibilityClassName() {
    return newCategoryModalOpen ? s.formVisible : "";
  }

  return (
    <form className={`${s.form} ${getVisibilityClassName()}`}>
      <button
        onClick={() => setNewCategoryModalOpen(false)}
        type="button"
        className={s.form__closeButton}
      >
        &times;
      </button>
      <input
        placeholder="Category name"
        type="text"
        className={s.form__inputName}
        id={"name"}
        {...register("name", { required: true })}
      />

      <input
        type="color"
        className={`${s.input} ${s.form__colorPicker}`}
        id={"color"}
        {...register("color", { required: true })}
      />
      <button
        type="submit"
        className={s.form__submitButton}
        onClick={(e) => e.preventDefault()}
      >
        add
      </button>
    </form>
  );
}
