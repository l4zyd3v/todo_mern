import s from "./categorymodal.module.scss";

import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { ModalVisibilityContext } from "../../../context/ModalVisibilityContext";
import SwiperTasksSlides from "../../../components/SwiperTasksSLides/SwiperTasksSlides";
import { categoryUtilsHandler } from "../../../utilsGlobal/utils";

export default function CategoryModal() {
  const { selectedCategory, tasks } = useContext(DataContext);
  const { categoryModalVisibility } = useContext(ModalVisibilityContext);
  const { getProgressPercentage } = categoryUtilsHandler();

  function getCategoryModalClassName() {
    return `${s.categoryModal}  ${
      categoryModalVisibility
        ? s.categoryModalVisible
        : categoryModalVisibility === false
          ? s.categoryModalHide
          : categoryModalVisibility === null
            ? s.defaultVisibilityHidden
            : ""
    }`;
  }

  return (
    <div className={getCategoryModalClassName()}>
      <h1 className={s.categoryModal__heading}>category name</h1>
      <span
        style={{
          backgroundColor: selectedCategory?.color,
          width: getProgressPercentage(tasks, selectedCategory?._id) + "%",
        }}
        className={s.categoryModal__progressBar}
      ></span>
      <SwiperTasksSlides
        s={s}
        parentComponent={"CategoryModal"}
        numberOfSlides={10}
      />
    </div>
  );
}
