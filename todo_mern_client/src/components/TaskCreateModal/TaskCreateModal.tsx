import { useState, useContext, useEffect } from "react";
import s from "./taskcreatemodal.module.scss";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import axios from "axios";
import { CategoryCardInterface, CategoriesInterface } from "../../types";
import NewCategoryForm from "./components/NewCategoryForm/NewCategoryForm";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import TaskModal from "../Modal/TaskModal";

// This type should maybe be used in a separate file
type TaskCreateModalProps = {
  visibility: boolean | null;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
};

type Inputs = {
  title: string;
  description?: string;
  dueDate?: string;
  categoryId?: string;
  priority?: string;
};

console.log("taskcreate lalalalalala");

export default function TaskCreateModal({
  visibility,
  setVisibility,
}: TaskCreateModalProps) {
  return <TaskModal visibility={visibility} setVisibility={setVisibility} />;
}
