import s from "./categoriesCard.module.css";
import { CategoryCardInterface } from "../../types";

export default function CategoriesCard({
  _id,
  name,
  color,
  userId,
  taskAmountOfCategory,
}: CategoryCardInterface) {
  return (
    <section className={s.card}>
      <p className={s.tasksAmount}>{taskAmountOfCategory} tasks</p>
      <h3 className={s.heading2}>{name}</h3>
      <span className={s.progressBar}>
        <span style={{ backgroundColor: color }} className={s.progess}></span>
      </span>
    </section>
  );
}
