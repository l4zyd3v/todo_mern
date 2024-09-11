import { useState, useContext } from "react";
import s from "./confirmdeletionwithtasks.module.scss";
import { DataContext } from "../../../../../../context/DataContext";

type PropType = {
  setDeleteCatWithTasksModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmDeletionWithTasks({
  setDeleteCatWithTasksModal,
}: PropType) {
  const [userInput, setUserInput] = useState("");
  const { selectedCategory } = useContext(DataContext);

  return (
    <div className={s.wrapper}>
      <div className={s.text}>
        <p className={s.text__firstText}>
          if you delete categoryName, all it's associated tasks will be deleted
          too.
        </p>
        <p className={s.text__secondText}>
          if you are sure you want to delete this category, type in the name of
          the category and click the delete button
        </p>
      </div>
      <input
        className={s.input}
        placeholder="Type Category Name"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></input>
      <div className={s.buttonWrapper}>
        <button
          className={`${s.buttonWrapper__buttons} ${s.buttonWrapper__deleteButton}`}
          type={userInput === selectedCategory?.name ? "submit" : "button"}
        >
          Delete
        </button>
        <button
          className={`${s.buttonWrapper__buttons} ${s.buttonWrapper__cancelButton}`}
          type="button"
          onClick={() => setDeleteCatWithTasksModal(false)}
        >
          cancel
        </button>
      </div>
    </div>
  );
}
