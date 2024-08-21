import { DataFormInputTypes } from "./dataFormInputTypes";

export type UpdateTaskProps = {
  data: Partial<DataFormInputTypes>;
  setVisibility?: React.Dispatch<React.SetStateAction<boolean | null>> | null;
  id?: string;
};
