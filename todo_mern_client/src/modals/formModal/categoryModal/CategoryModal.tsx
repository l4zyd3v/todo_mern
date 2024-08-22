import s from "./categorymodal.module.scss";

import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { TodoCard } from "../../../components";

export default function CategoryModal() {
  const { tasks } = useContext(DataContext);

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
          />
        </SwiperSlide>
      );
    });
  }

  return (
    <div className={s.categoryModal}>
      <div className={s.categoryModal__progressBar}></div>
      <h1 className={s.categoryModal__heading}>CategoryName</h1>

      <div className={s.cardWrapper}>
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
      </div>
    </div>
  );
}
