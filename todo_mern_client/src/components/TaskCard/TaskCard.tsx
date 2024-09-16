import { useState, useContext, useEffect } from "react";
import axios from "axios";
import s from "./taskcard.module.scss";
import { TodoCardInterface } from "../../types";
import TaskIcon from "./components/Icon/TaskIcon";
import { DataContext } from "../../context/DataContext";
import { ModalVisibilityContext } from "../../context/ModalVisibilityContext";
import useUpdateTask from "../../hooks/api/useUpdateTask";

const TaskCard: React.FC<TodoCardInterface> = ({
  _id,
  title,
  color,
  completed,
  parentComponent,
}) => {
  const updateTask = useUpdateTask();
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const { setSelectedTask, selectedTask } = useContext(DataContext);
  const {
    taskConfigureModalVisibility,
    setTaskConfigureModalVisibility,
    categoryModalVisibility,
  } = useContext(ModalVisibilityContext);

  useEffect(() => {
    setIsCompleted(completed);
  }, [taskConfigureModalVisibility]);

  function getCardClassname() {
    return `
${s.card} ${parentComponent === "CategoryModal" ? s.categoryModal__card : ""}
`;
  }

  return (
    <>
      <div className={getCardClassname()}>
        <TaskIcon
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
            setTaskConfigureModalVisibility(true);
          }}
          className={s.card__clickableTitleToOpenModal}
        >
          {title}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
