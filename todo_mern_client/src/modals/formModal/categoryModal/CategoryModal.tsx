import s from "./categorymodal.module.scss";

import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import SwiperTasksSlides from "../../../components/SwiperTasksSLides/SwiperTasksSlides";

export default function CategoryModal() {
  const { tasks } = useContext(DataContext);
  return (
    <div className={s.categoryModal}>
      <h1 className={s.categoryModal__heading}>category name</h1>
      <SwiperTasksSlides
        s={s}
        parentComponent={"CategoryModal"}
        numberOfSlides={10}
      />
    </div>
  );
}
