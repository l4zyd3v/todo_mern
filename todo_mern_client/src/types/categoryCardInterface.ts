import { TasksInterface } from "./index";

export interface CategoryCardInterface {
  key?: string;
  _id: string;
  name: string;
  color: string;
  userId: string;
  taskAmountOfCategory: number;
  tasks: Array<TasksInterface>;
}
