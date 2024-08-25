import { useContext } from "react";
import { ModalVisibilityContext } from "../../../context/ModalVisibilityContext";
import s from "./taskconfiguremodal.module.scss";
import TaskModal from "../components/Modal/TaskModal";

export default function TaskConfigureModal() {
  const { taskConfigureModalVisibility, setTaskConfigureModalVisibility } =
    useContext(ModalVisibilityContext);

  return (
    <TaskModal
      visibility={taskConfigureModalVisibility}
      setVisibility={setTaskConfigureModalVisibility}
      modalType={"configure"}
    />
  );
}
