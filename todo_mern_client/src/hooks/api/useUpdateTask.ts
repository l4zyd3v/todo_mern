import { useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import { UpdateTaskProps } from "../../types/index";

const useUpdateTask = () => {
  const { setTasks, tasks, selectedTask, setSelectedTask } =
    useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);

  async function updateTask({ data, setVisibility, id }: UpdateTaskProps) {
    const taskId = id ? id : selectedTask?._id;
    const { title, description, dueDate, categoryId, priority, completed } =
      data;

    if (!userId) {
      console.error("No userId id found");
      return;
    }
    if (!taskId) {
      console.error("No task id found");
      return;
    }
    try {
      const response = await axios.put(
        `http://${import.meta.env.VITE_HOSTURL}:3000/tasks/configuretask/${taskId}`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        console.log(response.data.message);

        if (response.data.modified === false) {
          console.log("No changes were made");
          return;
        }

        setTasks(
          tasks.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  title: title ? title : task.title,
                  description: description ? description : task.description,
                  dueDate: dueDate ? dueDate : task.dueDate,
                  categoryId: categoryId ? categoryId : task.categoryId,
                  priority: priority ? priority : task.priority,
                  completed:
                    completed !== undefined ? completed : task.completed,
                }
              : task,
          ),
        );

        setVisibility && setVisibility(false);
      } else {
        console.log("Failed to update task: ", response.status);
      }

      console.log("TaskConfigureModal.tsx - updatetaskk: ", response);
    } catch (error) {
      console.error("An error occurred while creating the task: ", error);
    }
  }

  return updateTask;
};

export default useUpdateTask;
