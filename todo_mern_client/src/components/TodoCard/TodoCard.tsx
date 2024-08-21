import { useState, useContext, useEffect } from "react";
import axios from "axios";
import s from "./todocard.module.scss";
import { TodoCardInterface } from "../../types";
import TodoIcon from "./components/Icon/TodoIcon";
import { DataContext } from "../../context/DataContext";
import useUpdateTask from "../../hooks/api/useUpdateTask";

const TodoCard: React.FC<TodoCardInterface> = ({
  _id,
  title,
  color,
  completed,
  setTaskConfigureVisibility,
  taskConfigureVisibility,
}) => {
  const updateTask = useUpdateTask();
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const { setSelectedTask, tasks, selectedTask } = useContext(DataContext);

  // useEffect(() => {
  //   setIsCompleted(completed);
  // }, [completed, setIsCompleted, taskConfigureVisibility]);

  useEffect(() => {
    setIsCompleted(completed);
  }, [taskConfigureVisibility]);

  return (
    <>
      <div className={s.card}>
        <TodoIcon
          color={color}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          taskId={_id}
          updateTask={updateTask}
          selectedTask={selectedTask}
        />
        <div
          onClick={() => {
            setSelectedTask(_id);
            setTaskConfigureVisibility(true);
          }}
          className={s.card__clickableTitleToOpenModal}
        >
          {title}
        </div>
      </div>
    </>
  );
};

export default TodoCard;
