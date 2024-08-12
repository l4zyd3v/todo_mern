interface DeleteButtonProps {
  modalType: string;
  s: CSSModuleClasses;
  setDeleteTaskConfirm: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function DeleteButton({
  modalType,
  s,
  setDeleteTaskConfirm,
}: DeleteButtonProps) {
  if (modalType !== "configure") return null;
  return (
    <button
      onClick={() => setDeleteTaskConfirm(true)}
      type="button"
      className={s.form__deleteButton}
    >
      Delete
    </button>
  );
}
