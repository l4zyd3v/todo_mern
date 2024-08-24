import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import TodoCard from "../TodoCard/TodoCard";

import { CategoriesInterface, TasksInterface } from "../../types";

type SwiperTasksSlidesTypes = {
  setTaskConfigureVisibility?: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  taskConfigureVisibility?: boolean | null;
  s: CSSModuleClasses;
  parentComponent: string;
  numberOfSlides: number;
};

export default function SwiperTasksSlides({
  setTaskConfigureVisibility,
  taskConfigureVisibility,
  s,
  parentComponent,
  numberOfSlides,
}: SwiperTasksSlidesTypes) {
  const { tasks, categories } = useContext(DataContext);

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
      if (task.categoryId === "category._id") {
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
          <TodoCard
            _id={_id}
            title={title}
            description={description}
            color={categoryColor}
            completed={completed}
            setTaskConfigureVisibility={setTaskConfigureVisibility}
            taskConfigureVisibility={taskConfigureVisibility}
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
          <TodoCard
            _id={_id}
            title={title}
            description={description}
            color={categoryColor}
            completed={completed}
            setTaskConfigureVisibility={setTaskConfigureVisibility}
            taskConfigureVisibility={taskConfigureVisibility}
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
      {renderTasks()}
    </Swiper>
  );
}
