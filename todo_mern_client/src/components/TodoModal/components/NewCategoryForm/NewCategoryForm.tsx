import React, { useEffect, useContext } from "react";
import { UserLoggedInContext } from "../../../../context/UserLoggedInContext";
import { DataContext } from "../../../../context/DataContext";
import { CategoriesInterface } from "../../../../types";
import s from "./newcategoryform.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Props = {
  newCategoryModalOpen: boolean;
  setNewCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Inputs = {
  name: string;
  color: string;
};

export default function NewCategoryForm({
  newCategoryModalOpen,
  setNewCategoryModalOpen,
}: Props) {
  const { userId } = useContext(UserLoggedInContext);
  const { addCategory } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  console.log("userId", userId);

  const createCategory = async (data: Inputs) => {
    if (!userId) {
      console.error("No userId id found");
      return;
    }
    try {
      // maybe not necessary to add userId as param since userID already is present in req headers
      const response = await axios.post(
        `http://${import.meta.env.VITE_HOSTURL}:3000/categories/${userId}`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        console.log("Category created successfully");
        setNewCategoryModalOpen(false);
        addCategory(response.data);
      } else {
        console.log("Failed to create category: ", response.status);
      }

      console.log(response);
    } catch (error) {
      console.error("An error occurred while creating the category: ", error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createCategory(data);
    console.log(data);
  };

  function getVisibilityClassName() {
    return newCategoryModalOpen ? s.formVisible : "";
  }

  function randomHexColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  }

  useEffect(() => {
    if (newCategoryModalOpen) {
      // Reset the category name input when the modal is opened
      reset();
    }
  }, [newCategoryModalOpen]);

  return (
    <form
      className={`${s.form} ${getVisibilityClassName()}`}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        value={randomHexColor()}
      />
      <button type="submit" className={s.form__submitButton}>
        add new category
      </button>
    </form>
  );
}
