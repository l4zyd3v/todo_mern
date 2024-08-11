import { TasksInterface } from "../../../types/tasksInterface";

export type PropTypes = {
  visibility: boolean | null;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
  modalType: string;
  taskToConfigure?: TasksInterface;
};
