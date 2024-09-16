import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import TaskCard from "../TaskCard/TaskCard";

import { CategoriesInterface, TasksInterface } from "../../types";

type SwiperTasksSlidesTypes = {
  s: CSSModuleClasses;
  parentComponent: string;
  numberOfSlides: number;
};

export default function SwiperTasksSlides({
  s,
  parentComponent,
  numberOfSlides,
}: SwiperTasksSlidesTypes) {
  const { tasks, categories, selectedCategory } = useContext(DataContext);

  function getSwiperClassName(parentType: string) {
    switch (parentType) {
      case "Home":
        return s.cardWrapper__swiper;
      case "CategoryModal":
        return s.categoryModal__swiper;
      default:
        return "";
    }
  }

  function getTaskColorRelatedToCategory(
    taskCategoryId: string | undefined,
    categories: CategoriesInterface[],
  ) {
    for (let category of categories) {
      if (category._id === taskCategoryId) {
        return category.color;
      }
    }
  }

  function renderCategorySpecficTasks() {
    const categorySpecficTasks = [] as TasksInterface[];

    tasks.filter((task) => {
      if (task.categoryId === selectedCategory?._id) {
        categorySpecficTasks.push(task);
      }
    });

    return [...categorySpecficTasks].reverse().map((task) => {
      const { _id, title, description, categoryId, completed } = task;

      const categoryColor = getTaskColorRelatedToCategory(
        categoryId,
        categories,
      );

      return (
        <SwiperSlide key={task._id} className={s.cardWrapper__swiperSlide}>
          <TaskCard
            _id={_id}
            title={title}
            description={description}
            color={categoryColor}
            completed={completed}
            parentComponent={parentComponent}
          />
        </SwiperSlide>
      );
    });
  }

  function renderTasks() {
    return [...tasks].reverse().map((task) => {
      const { _id, title, description, categoryId, completed } = task;

      const categoryColor = getTaskColorRelatedToCategory(
        categoryId,
        categories,
      );

      return (
        <SwiperSlide key={task._id} className={s.cardWrapper__swiperSlide}>
          <TaskCard
            _id={_id}
            title={title}
            description={description}
            color={categoryColor}
            completed={completed}
          />
        </SwiperSlide>
      );
    });
  }

  return (
    <Swiper
      slidesPerView={numberOfSlides}
      spaceBetween={3}
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={getSwiperClassName(parentComponent)}
    >
      {parentComponent === "CategoryModal"
        ? renderCategorySpecficTasks()
        : parentComponent === "Home"
          ? renderTasks()
          : null}
    </Swiper>
  );
}
