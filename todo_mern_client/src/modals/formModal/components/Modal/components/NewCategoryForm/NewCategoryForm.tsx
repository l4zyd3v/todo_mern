import React, { useEffect, useContext, useState } from "react";
import { UserLoggedInContext } from "../../../../../../context/UserLoggedInContext";
import { DataContext } from "../../../../../../context/DataContext";
import { CategoriesInterface } from "../../../../types";
import s from "./newcategoryform.module.scss";
import { useForm, SubmitHandler, UseFormSetValue } from "react-hook-form";
import axios from "axios";

type Props = {
  newCategoryModalOpen: boolean;
  setNewCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onNewCategoryId: (newCategoryId: string) => void;
};

export type Inputs = {
  name: string;
  color: string;
};

export default function NewCategoryForm({
  newCategoryModalOpen,
  setNewCategoryModalOpen,
  onNewCategoryId,
}: Props) {
  const { userId } = useContext(UserLoggedInContext);
  const { addCategory } = useContext(DataContext);
  const [color, setColor] = useState(randomHexColor());
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    setColor(randomHexColor());
  }, [newCategoryModalOpen]);

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
        console.log("response.data: ", response.data);
        console.log(
          "response.data._id: ",
          response.data._id,
          typeof response.data._id,
        );
        const categoryId = response.data._id;
        // setNewCreatedCategoryAsSelected("categoryId", categoryId);
        addCategory(response.data);
        setNewCategoryModalOpen(false);
        onNewCategoryId(categoryId);
      } else {
        console.log("Failed to create category: ", response.status);
      }
    } catch (error) {
      console.error("An error occurred while creating the category: ", error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createCategory(data);
  };

  function getVisibilityClassName() {
    return newCategoryModalOpen ? s.formVisible : "";
  }

  useEffect(() => {
    if (newCategoryModalOpen) {
      // Reset the category name input when the modal is opened
      reset();
    }
  }, [newCategoryModalOpen]);

  function randomHexColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  }

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
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit" className={s.form__submitButton}>
        add new category
      </button>
    </form>
  );
}
