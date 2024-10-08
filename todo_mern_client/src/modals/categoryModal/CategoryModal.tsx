import s from "./categorymodal.module.scss";
import { IoIosCloseCircle } from "react-icons/io";

import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { ModalVisibilityContext } from "../../context/ModalVisibilityContext";
import SwiperTasksSlides from "../../components/SwiperTasksSLides/SwiperTasksSlides";
import { categoryUtilsHandler } from "../../utilsGlobal/utils";
import { IoMdSettings } from "react-icons/io";
import SettingsCategoryModal from "./components/SettingsCategoryModal/SettingsCategoryModal";

export default function CategoryModal() {
  const { selectedCategory, tasks, categories } = useContext(DataContext);
  const {
    categoryModalVisibility,
    setCategoryModalVisibility,
    categorySettingsVisibility,
    setCategorySettingsVisibility,
  } = useContext(ModalVisibilityContext);
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

  useEffect(() => {
    console.log(selectedCategory?.name);
    console.log(
      categories.find((category) => category._id === selectedCategory?._id) ||
        null,
    );
  }, [setCategorySettingsVisibility, categorySettingsVisibility]);

  // To make sure the width rule is 0 when the modal is opened to see the progressBar width transion from 0 to it respective state.

  const percentageWidth = !categoryModalVisibility
    ? 0
    : getProgressPercentage(tasks, selectedCategory?._id) + "%";

  return (
    <div className={getCategoryModalClassName()}>
      <IoIosCloseCircle
        onClick={() => setCategoryModalVisibility(false)}
        className={s.categoryModal__exitBtn}
      />
      <IoMdSettings
        className={s.categoryModal__settingsButton}
        onClick={() => setCategorySettingsVisibility(true)}
      />
      <SettingsCategoryModal />
      <h2 className={s.categoryModal__heading}>{selectedCategory?.name}</h2>
      <div className={s.progressBar}>
        <span
          style={{
            backgroundColor: selectedCategory?.color,
            width: percentageWidth,
          }}
          className={s.progressBar__progress}
        ></span>
      </div>
      <div>chart</div>
      <SwiperTasksSlides
        s={s}
        parentComponent={"CategoryModal"}
        numberOfSlides={6}
      />
      <button
        onClick={() => setCategoryModalVisibility(false)}
        className={s.categoryModal__doneButton}
      >
        Done
      </button>
      {categorySettingsVisibility ? (
        <div
          onClick={() => setCategorySettingsVisibility(false)}
          className={s.forGroundOverlay}
        ></div>
      ) : null}
    </div>
  );
}
