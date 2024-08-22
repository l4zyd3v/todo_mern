import s from "./categorymodal.module.scss";

import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";

import useSwiperTasksSlides from "../../../hooks/components/useSwiperTasksSlides";

export default function CategoryModal() {
  const { tasks } = useContext(DataContext);
  return (
    <div className={s.categoryModal}>
      <h1 className={s.categoryModal__heading}>category name</h1>
    </div>
  );
}
