export interface TodoCardInterface {
  title: string;
  _id: string;
  description: string;
  categoryId?: string;
  color: string | undefined;
  completed: boolean;
}
