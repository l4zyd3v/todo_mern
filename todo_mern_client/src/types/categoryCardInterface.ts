import { TodoCardInterface } from ".";

export interface CategoryCardInterface {
  key?: string;
  _id: string;
  name: string;
  color: string;
  userId: string;
  taskAmountOfCategory: number;
  tasks: Array<TodoCardInterface>;
}
