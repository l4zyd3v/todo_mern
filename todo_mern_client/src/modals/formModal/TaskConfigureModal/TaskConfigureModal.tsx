import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import s from "./taskconfiguremodal.module.scss";
import TaskModal from "../components/Modal/TaskModal";

type PropTypes = {
  visibility: null | boolean;
  setVisibility: React.Dispatch<React.SetStateAction<null | boolean>>;
};

function getWrapperClass(visibility: PropTypes["visibility"]) {
  return `${s.wrapper} ${visibility === true ? s.wrapperOpen : visibility === false ? s.wrapperClosed : ""}`;
}

export default function TaskConfigureModal({
  visibility,
  setVisibility,
}: PropTypes) {
  const { tasks, selectedTask } = useContext(DataContext);

  return (
    <TaskModal
      visibility={visibility}
      setVisibility={setVisibility}
      modalType={"configure"}
    />
  );
}
