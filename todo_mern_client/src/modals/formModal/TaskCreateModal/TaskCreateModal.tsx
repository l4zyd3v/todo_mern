// import s from "./taskcreatemodal.module.scss";
import TaskModal from "../components/Modal/TaskModal";

// This type should maybe be used in a separate file
type PropTypes = {
  visibility: boolean | null;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function TaskCreateModal({
  visibility,
  setVisibility,
}: PropTypes) {
  return (
    <TaskModal
      visibility={visibility}
      setVisibility={setVisibility}
      modalType={"create"}
    />
  );
}
