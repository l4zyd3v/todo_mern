import s from "./taskicon.module.scss";
import { FaCheck } from "react-icons/fa";
import { TasksInterface } from "../../../../types";

import { DataFormInputTypes, UpdateTaskProps } from "../../../../types";
type TodoIconProps = {
  color: string | undefined;
  isCompleted: boolean | null;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
  updateTask: (props: UpdateTaskProps) => void;
  selectedTask: TasksInterface | null | undefined;
};

export default function TaskIcon({
  color,
  isCompleted,
  setIsCompleted,
  taskId,
  updateTask,
  selectedTask,
}: TodoIconProps) {
  const style = isCompleted
    ? { border: `2px solid ${color}`, backgroundColor: color }
    : { border: `2px solid ${color}` };

  function renderIcon() {
    return isCompleted === true ? (
      <FaCheck className={s.icon__checkmark} />
    ) : null;
  }

  let data: DataFormInputTypes = {
    completed: !isCompleted,
  };

  return (
    <div
      onClick={async () => {
        setIsCompleted(!isCompleted);
        updateTask({ data, setVisibility: null, id: taskId });
      }}
      className={s.iconClickWrapper}
    >
      <div style={style} className={s.icon}>
        {renderIcon()}
      </div>
    </div>
  );
}
