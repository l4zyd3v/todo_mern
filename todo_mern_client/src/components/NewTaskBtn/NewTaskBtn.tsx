import s from "./newTaskBtn.module.scss";

interface TaskButtonProps {
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function NewTaskBtn({ setModal }: TaskButtonProps) {
  return (
    <button onClick={() => setModal(true)} className={s.newTaskBtn}>
      &#43;
    </button>
  );
}
