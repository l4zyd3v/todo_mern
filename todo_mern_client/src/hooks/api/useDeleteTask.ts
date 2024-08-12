import { useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import { TasksInterface } from "../../types";

const useDeleteTask = () => {
  const { setTasks, tasks } = useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);

  async function deleteTask(
    taskToConfigure: TasksInterface | undefined,
    setVisibility: React.Dispatch<React.SetStateAction<null | boolean>>,
  ) {
    if (!userId) {
      console.error("No userId id found");
      return;
    }
    const taskId = taskToConfigure?._id;
    try {
      const response = await axios.delete(
        `http://${import.meta.env.VITE_HOSTURL}:3000/tasks/delete/${taskId}`,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        console.log(response.data.message);
        setTasks(tasks.filter((task) => task._id !== taskId));
        setVisibility(false);
      } else {
        console.log("Failed to delete task: ", response.status);
      }

      console.log("Modal.tsx - configureTask/deleteTask: ", response);
    } catch (error) {
      console.error("An error occurred while deleting the task: ", error);
    }
  }

  return deleteTask;
};

export default useDeleteTask;
