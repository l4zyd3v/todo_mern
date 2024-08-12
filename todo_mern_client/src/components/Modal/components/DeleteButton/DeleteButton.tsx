import { TasksInterface } from "../../../../types";
import useDeleteTask from "../../../../hooks/api/useDeleteTask";

interface DeleteButtonProps {
  modalType: string;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
  taskToConfigure: TasksInterface | undefined;
  s: CSSModuleClasses;
}

export default function DeleteButton({
  modalType,
  setVisibility,
  taskToConfigure,
  s,
}: DeleteButtonProps) {
  // contexts
  const deleteTask = useDeleteTask();

  if (modalType !== "configure") return null;
  return (
    <button
      onClick={() => deleteTask(taskToConfigure, setVisibility)}
      type="button"
      className={s.form__deleteButton}
    >
      Delete
    </button>
  );
}
