import s from "./todobutton.module.css";

interface TodoButtonProps {
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function TodoButton({ setModal }: TodoButtonProps) {
  return (
    <button onClick={() => setModal(true)} className={s.todoButton}>
      &#43;
    </button>
  );
}
