import { useState, createContext } from "react";
import { CategoriesInterface, TasksInterface } from "../types";

interface DataContextType {
  setCategories: React.Dispatch<React.SetStateAction<CategoriesInterface[]>>;
  addCategory: (newCategory: CategoriesInterface) => void;
  categories: Array<CategoriesInterface>;
  setTasks: React.Dispatch<React.SetStateAction<TasksInterface[]>>;
  addTask: (newTask: TasksInterface) => void;
  tasks: Array<TasksInterface>;
}

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const DataContext = createContext<DataContextType>({
  setCategories: () => {},
  addCategory: () => {},
  categories: [],
  setTasks: () => {},
  addTask: () => {},
  tasks: [],
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [categories, setCategories] = useState<CategoriesInterface[]>([]);
  const [tasks, setTasks] = useState<TasksInterface[]>([]);

  const addCategory = (newCategory: CategoriesInterface) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const addTask = (newTask: TasksInterface) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const value = {
    categories,
    setCategories,
    addCategory,
    tasks,
    setTasks,
    addTask,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
