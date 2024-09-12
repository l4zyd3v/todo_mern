import { useContext } from "react";
import { ModalVisibilityContext } from "../../../context/ModalVisibilityContext";
// import s from "./taskcreatemodal.module.scss";
import TaskModal from "../components/Modal/TaskModal";

export default function TaskCreateModal() {
  const { taskCreateModalVisibility, setTaskCreateModalVisibility } =
    useContext(ModalVisibilityContext);

  return (
    <TaskModal
      visibility={taskCreateModalVisibility}
      setVisibility={setTaskCreateModalVisibility}
      modalType={"create"}
    />
  );
}
