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

  // To make sure the width rule is 0 when the modal is opened to see the progressBar width transion from 0 to it respective state.
  const percentageWidth = !categoryModalVisibility
    ? 0
    : getProgressPercentage(tasks, selectedCategory?._id) + "%";

  return (
    <div className={getCategoryModalClassName()}>
      <h1 className={s.categoryModal__heading}>{selectedCategory?.name}</h1>
      <span
        style={{
          backgroundColor: selectedCategory?.color,
          width: percentageWidth,
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
