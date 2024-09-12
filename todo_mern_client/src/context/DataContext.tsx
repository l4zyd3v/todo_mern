import { useState, createContext, useEffect } from "react";
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

  selectedCategory: CategoriesInterface | null;
  setSelectedCategory: (categoryId: string) => void;
}

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const DataContext = createContext<DataContextType>({
  setCategories: () => null,
  addCategory: () => null,
  categories: [],
  setTasks: () => null,
  addTask: () => null,
  tasks: [],
  selectedTask: null,
  setSelectedTask: () => null,
  selectedCategory: null,
  setSelectedCategory: () => null,
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [categories, setCategories] = useState<CategoriesInterface[]>([]);
  const [tasks, setTasks] = useState<TasksInterface[]>([]);
  const [selectedTask, setCurrentTask] = useState<TasksInterface | null>(null);
  const [selectedCategory, setCurrentCategory] =
    useState<CategoriesInterface | null>(null);

  const setSelectedCategory = (categoryId: string) => {
    setCurrentCategory(
      categories.find((category) => category._id === categoryId) || null,
    );
  };

  const setSelectedTask = (taskId: string) => {
    setCurrentTask(tasks.find((task) => task._id === taskId) || null);
  };

  const addCategory = (newCategory: CategoriesInterface) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const addTask = (newTask: TasksInterface) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    if (selectedCategory) {
      const updatedCategory = categories.find(
        (category) => category._id === selectedCategory._id,
      );
      setCurrentCategory(updatedCategory || null);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedTask) {
      const updatedTask = tasks.find((task) => task._id === selectedTask._id);
      setCurrentTask(updatedTask || null);
    }
  }, [tasks]);

  const value = {
    categories,
    setCategories,
    addCategory,
    tasks,
    setTasks,
    addTask,
    selectedTask,
    setSelectedTask,
    selectedCategory,
    setSelectedCategory,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
