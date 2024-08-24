import { useState, createContext } from "react";
import { CategoriesInterface, TasksInterface } from "../types";

interface DataContextType {
  setCategories: React.Dispatch<React.SetStateAction<CategoriesInterface[]>>;
  addCategory: (newCategory: CategoriesInterface) => void;
  categories: Array<CategoriesInterface>;
  setTasks: React.Dispatch<React.SetStateAction<TasksInterface[]>>;
  addTask: (newTask: TasksInterface) => void;
  tasks: Array<TasksInterface>;

  selectedTask: TasksInterface | null;
  setSelectedTask: (id: string) => void;

  setTaskCompletion?: (taskId: string) => void;
}

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [categories, setCategories] = useState<CategoriesInterface[]>([]);
  const [tasks, setTasks] = useState<TasksInterface[]>([]);
  const [selectedTask, setCurrentTask] = useState<TasksInterface | null>(null);

  const setSelectedTask = (taskId: string) => {
    setCurrentTask(tasks.find((task) => task._id === taskId) || null);
  };

  const addCategory = (newCategory: CategoriesInterface) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const addTask = (newTask: TasksInterface) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const setTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const value = {
    categories,
    setCategories,
    addCategory,
    tasks,
    setTasks,
    addTask,
    setTaskCompletion,
    selectedTask,
    setSelectedTask,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
