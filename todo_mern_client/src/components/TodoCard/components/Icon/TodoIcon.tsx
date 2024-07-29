import s from "./todoicon.module.scss";
import { FaCheck } from "react-icons/fa";

type TodoIconProps = {
  color: string | undefined;
  isCompleted: boolean;
};

export default function TodoIcon({ color, isCompleted }: TodoIconProps) {
  const style = isCompleted
    ? { border: `2px solid ${color}`, backgroundColor: color }
    : { border: `2px solid ${color}` };

  function renderIcon() {
    return isCompleted && <FaCheck className={s.icon__checkmark} />;
  }

  return (
    <div style={style} className={s.icon}>
      {renderIcon()}
    </div>
  );
}
