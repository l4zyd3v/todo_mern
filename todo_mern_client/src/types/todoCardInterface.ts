export interface TodoCardInterface {
  _id: string;
  title: string;
  description: string;
  categoryId?: string;
  color: string | undefined;
  completed: boolean;
  parentComponent: string;
}
