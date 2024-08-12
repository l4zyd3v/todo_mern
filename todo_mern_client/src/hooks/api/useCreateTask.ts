import { useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import { Inputs } from "../../../src/components/Modal/types/index";

const useCreateTask = () => {
  const { addTask } = useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);

  async function createTask(
    data: Inputs,
    setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>,
  ) {
    console.log("data: ", data);
    if (!userId) {
      console.error("No userId id found");
      return;
    }
    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_HOSTURL}:3000/newtask`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        console.log("Task created successfully");
        addTask(response.data);
        setVisibility(false);
      } else {
        console.log("Failed to create task: ", response.status);
      }

      console.log("Modal.tsx - createTask/addTask: ", response);
    } catch (error) {
      console.error("An error occurred while creating the task: ", error);
    }
  }

  return createTask;
};

export default useCreateTask;
