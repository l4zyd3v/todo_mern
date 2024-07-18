import { useState } from "react";
import axios from "axios";
import s from "./todocard.module.css";
import { TodoCardInterface } from "../../types";
import TodoIcon from "./components/Icon/TodoIcon";

const TodoCard: React.FC<TodoCardInterface> = ({
  _id,
  title,
  // description,
  color,
  completed,
  // onDelete,
  onComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  // **This is for deleting a task**
  // const handleDelete = async (taskId: string) => {
  //   try {
  //     await axios.delete(
  //       `http://${import.meta.env.VITE_HOSTURL}:3000/tasks/${taskId}`,
  //       {
  //         withCredentials: true,
  //       },
  //     );
  //     onDelete(taskId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDoubleClick = async (taskId: string) => {
    try {
      const response = await axios.put(
        `http://${import.meta.env.VITE_HOSTURL}:3000/tasks/${taskId}`,
        {
          completed: !isCompleted,
        },
        {
          withCredentials: true,
        },
      );
      if (response.data.completed !== undefined) {
        console.log(response.data._id);
        setIsCompleted(response.data.completed);
        onComplete(taskId, response.data.completed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onDoubleClick={() => handleDoubleClick(_id)} className={s.card}>
      <TodoIcon color={color} isCompleted={isCompleted} />
      {title}
    </div>
  );
};

export default TodoCard;
