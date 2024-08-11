import s from "./todoicon.module.scss";
import { FaCheck } from "react-icons/fa";

type TodoIconProps = {
  color: string | undefined;
  isCompleted: boolean;
  handleTaskCompletionClick: (taskId: string) => void;
  taskId: string;
};

export default function TodoIcon({
  color,
  isCompleted,
  handleTaskCompletionClick,
  taskId,
}: TodoIconProps) {
  const style = isCompleted
    ? { border: `2px solid ${color}`, backgroundColor: color }
    : { border: `2px solid ${color}` };

  function renderIcon() {
    return isCompleted && <FaCheck className={s.icon__checkmark} />;
  }

  return (
    <div
      onClick={() => handleTaskCompletionClick(taskId)}
      className={s.iconClickWrapper}
    >
      <div style={style} className={s.icon}>
        {renderIcon()}
      </div>
    </div>
  );
}
