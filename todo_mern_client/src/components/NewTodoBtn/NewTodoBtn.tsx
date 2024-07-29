import s from "./newTodoBtn.module.scss";

interface TodoButtonProps {
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function NewTodoBtn({ setModal }: TodoButtonProps) {
  return (
    <button onClick={() => setModal(true)} className={s.newTodoBtn}>
      &#43;
    </button>
  );
}
