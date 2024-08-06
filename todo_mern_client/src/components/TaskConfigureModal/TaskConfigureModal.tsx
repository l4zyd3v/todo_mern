import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import s from "./taskconfiguremodal.module.scss";

type PropTypes = {
  visibility: null | boolean;
  setVisibility: React.Dispatch<React.SetStateAction<null | boolean>>;
  taskToConfigure_id: string | null;
};

function getWrapperClass(visibility: PropTypes["visibility"]) {
  return `${s.wrapper} ${visibility === true ? s.wrapperOpen : visibility === false ? s.wrapperClosed : ""}`;
}

export default function TaskConfigureModal({
  visibility,
  setVisibility,
  taskToConfigure_id,
}: PropTypes) {
  const { tasks } = useContext(DataContext);

  const taskToConfigure = tasks?.find(
    (task) => task._id === taskToConfigure_id,
  );

  console.log("Task to configure", taskToConfigure);

  return (
    <div className={getWrapperClass(visibility)}>
      <button onClick={() => setVisibility(false)}>click me</button>
    </div>
  );
}
