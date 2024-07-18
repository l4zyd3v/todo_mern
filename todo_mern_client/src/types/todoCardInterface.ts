export interface TodoCardInterface {
  title: string;
  _id: string;
  description: string;
  categoryId?: string;
  color: string | undefined;
  completed: boolean;
  // onDelete: (taskId: string) => void;

  onComplete: (taskId: string, isCompleted: boolean) => void;
}
