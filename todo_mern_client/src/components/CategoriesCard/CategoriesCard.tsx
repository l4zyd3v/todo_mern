import s from "./categoriesCard.module.scss";
import { CategoryCardInterface } from "../../types";
import { TodoCardInterface } from "../../types";
import { useEffect } from "react";

export default function CategoriesCard({
  _id,
  name,
  color,
  userId,
  taskAmountOfCategory,
  tasks,
}: CategoryCardInterface) {
  function getProgressPercentage(
    tasks: Array<TodoCardInterface>,
    categoryId: string,
  ) {
    let completedTasks = 0;
    let totalTasks = 0;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].categoryId === categoryId) {
        totalTasks++;
        if (tasks[i].completed) {
          completedTasks++;
        }
      }
    }

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return progress;
  }

  return (
    <section className={s.card}>
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
