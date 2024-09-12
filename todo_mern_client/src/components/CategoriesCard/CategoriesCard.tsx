import { useContext } from "react";
import { ModalVisibilityContext } from "../../context/ModalVisibilityContext";
import { DataContext } from "../../context/DataContext";
import s from "./categoriesCard.module.scss";
import { CategoryCardInterface, TasksInterface } from "../../types";
import { categoryUtilsHandler } from "../../utilsGlobal/utils";

export default function CategoriesCard({
  _id,
  name,
  color,
  userId,
  taskAmountOfCategory,
  tasks,
}: CategoryCardInterface) {
  const { categoryModalVisibility, setCategoryModalVisibility } = useContext(
    ModalVisibilityContext,
  );
  const { selectedCategory, setSelectedCategory } = useContext(DataContext);
  const { getProgressPercentage } = categoryUtilsHandler();

  return (
    <section
      onClick={() => {
        setSelectedCategory(_id);
        setCategoryModalVisibility(true);
      }}
      className={s.card}
    >
      <p className={s.card__tasksAmount}>{taskAmountOfCategory} tasks</p>
      <h3 className={s.card__heading2}>{name}</h3>
      <span className={s.card__progressBar}>
        <span
          style={{
            backgroundColor: color,
            width: getProgressPercentage(tasks, _id) + "%",
          }}
          className={s.card__progess}
        ></span>
      </span>
    </section>
  );
}
