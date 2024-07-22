import s from "./newcategoryform.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

export default function NewCategoryForm() {
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

  return (
    <form className={s.form}>
      <input
        type="text"
        className={s.nameInput}
        id={"name"}
        {...register("name", { required: true })}
      />

      <input
        type="color"
        className={`${s.input} ${s.colorInput}`}
        id={"color"}
        {...register("color", { required: true })}
      />
      <button type="submit" className={s.submitButton}></button>
    </form>
  );
}
