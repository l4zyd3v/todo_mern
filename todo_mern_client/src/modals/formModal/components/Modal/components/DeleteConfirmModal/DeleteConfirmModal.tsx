import s from "./deleteconfirmmodal.module.scss";
import useDeleteTask from "../../../../../../hooks/api/useDeleteTask";
import { TasksInterface } from "../../../../../../types";

type DeleteConformModalTypes = {
  deleteTaskConfirm: boolean | null;
  setDeleteTaskConfirm: React.Dispatch<React.SetStateAction<boolean | null>>;
  modalType: string;
  taskToConfigure: TasksInterface | undefined;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function DeleteConfirmModal({
  deleteTaskConfirm,
  setDeleteTaskConfirm,
  modalType,
  taskToConfigure,
  setVisibility,
}: DeleteConformModalTypes) {
  const deleteTask = useDeleteTask();

  if (modalType !== "configure") return null;
  if (!deleteTaskConfirm) return null;

  return (
    <div className={s.deleteConfirmModal}>
      <p>Are you sure you want to delete this task?</p>
      <div className={s.buttonWrapper}>
        <button
          onClick={() => {
            setDeleteTaskConfirm(false);
          }}
          className={`${s.deleteConfirmModal__Button} ${s.deleteConfirmModal__ButtonCancel}`}
        >
          Cancel
        </button>
        <button
          className={`${s.deleteConfirmModal__Button} ${s.deleteConfirmModal__ButtonDelete}`}
          onClick={() => deleteTask(taskToConfigure, setVisibility)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
