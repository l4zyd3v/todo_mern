import s from "./categoriesCard.module.css";
import { todoCardInterface } from "../../types";

export default function CategoriesCard({ _id, description }) {
  return (
    <section className={s.card}>
      <p className={s.tasksAmount}>40 tasks</p>
      <h3 className={s.heading2}>{description}</h3>
      <span className={s.progressBar}>
        <span className={s.progess}></span>
      </span>
    </section>
  );
}
