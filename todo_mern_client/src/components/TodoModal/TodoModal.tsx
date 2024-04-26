import s from "./todomodal.module.css";

export default function TodoModal({ visibility, setVisibility }) {
  return (
    <div
      className={`${s.todoModal} ${visibility ? s.modalVisible : visibility === false ? s.modalHide : ""}`}
    >
      <button className={s.exitButton} onClick={() => setVisibility(false)}>
        &times;
      </button>
    </div>
  );
}
