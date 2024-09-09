import s from "./confirmdeletionwithnotasks.module.scss";

type ConfirmDeletionNoTasksTypes = {
  deleteCatNoTasks: boolean;
  setDeleteCatNoTasks: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmDeletionNoTasks({
  deleteCatNoTasks,
  setDeleteCatNoTasks,
}: ConfirmDeletionNoTasksTypes) {
  return (
    <div className={s.wrapper}>
      <p className={s.text}> are you sure you want to delete this category</p>
      <div className={s.buttonWrapper}>
        <button
          onClick={() => setDeleteCatNoTasks(false)}
          className={s.buttonWrapper__cancel}
          type="button"
        >
          cancel
        </button>
        <button className={s.buttonWrapper__delete}>yes delete</button>
      </div>
    </div>
  );
}
