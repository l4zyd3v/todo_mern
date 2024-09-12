import { TasksInterface } from "../types";

// category related
function categoryUtilsHandler() {
  return {
    getProgressPercentage: (
      tasks: Array<TasksInterface>,
      categoryId: string | undefined,
    ) => {
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
    },
  };
}

export { categoryUtilsHandler };
