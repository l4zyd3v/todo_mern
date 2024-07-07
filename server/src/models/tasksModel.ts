export interface Task {
  _id?: string;

  userId: string;
  category: string;
  title: string;
  description: string;
  colorLabel: string;
  dueDate: string;
  isCompleted: boolean;
}
