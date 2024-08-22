import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import TodoCard from "../TodoCard/TodoCard";

import { CategoriesInterface } from "../../types";

type SwiperTasksSlidesTypes = {
  setTaskConfigureVisibility: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  taskConfigureVisibility: boolean | null;
  s: CSSModuleClasses;
};

export default function SwiperTasksSlides({
  setTaskConfigureVisibility,
  taskConfigureVisibility,
  s,
}: SwiperTasksSlidesTypes) {
  const { tasks, categories } = useContext(DataContext);

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
      slidesPerView={5}
      spaceBetween={3}
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={s.cardWrapper__swiper}
    >
      {renderTasks()}
    </Swiper>
  );
}
