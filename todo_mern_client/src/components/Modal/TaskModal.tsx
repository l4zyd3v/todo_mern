import { useState, useContext, useEffect } from "react";
import s from "./taskmodal.module.scss";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import axios from "axios";
import { TasksInterface } from "../../types";
import NewCategoryForm from "./components/NewCategoryForm/NewCategoryForm";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import {
  categoryUtilsHandler,
  generalUtilsHandler,
  taskConfigureUtilsHandler,
} from "./utils/utils";
import { Inputs, PropTypes } from "./types/index";

export default function TaskModal({
  visibility,
  setVisibility,
  modalType,
  taskToConfigure,
}: PropTypes) {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Inputs>();

  // states
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);

  // contexts
  const { categories, addTask, setTasks, tasks } = useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);

  // utils
  const {
    getCategoryOptionValues,
    getDefaultCategoryId,
    getCategoryModalVisibilityClassName,
  } = categoryUtilsHandler(categories, newCategoryModalOpen, s);
  const {
    getModalClassName,
    getFormClassName,
    getSubmitName,
    getButtonClassName,
  } = generalUtilsHandler(visibility, s, modalType);
  const { getTaskToConfigureValues } = taskConfigureUtilsHandler(
    taskToConfigure,
    setValue,
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (modalType === "configure") {
      updateTask(data, userId, taskToConfigure, setTasks, tasks, setVisibility);
    } else if (modalType === "create") {
      createTask(data, userId, addTask, setVisibility);
    }
  };

  // useEffects

  // Reset the form when the modal is opened
  useEffect(() => {
    if (visibility) {
      reset();
    }
  }, [visibility]);

  // the modal is used for both when the user want to configure an exisiting task and to create a new task. Here the form inputs are set when the user want to configre an exisiting task
  useEffect(() => {
    if (modalType !== "configure") return;
    getTaskToConfigureValues();
  }, [visibility]);

  // Set the category as the newly created category if the user chooses to do that.
  useEffect(() => {
    if (newCategoryId) {
      setValue("categoryId", newCategoryId);
    }
  }, [newCategoryId, setValue]);

  // set the default categoryValue to be "personal" when creating a new task
  useEffect(() => {
    if (getDefaultCategoryId && !newCategoryId && modalType !== "configure") {
      setValue("categoryId", getDefaultCategoryId());
    }
  }, [getDefaultCategoryId, setValue]);

  return (
    <div className={getModalClassName()}>
      <button
        className={s.Modal__exitButton}
        onClick={() => setVisibility(false)}
      >
        &times;
      </button>
      <form className={getFormClassName()} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className={s.form__input}
            id={"title"}
            {...register("title", { required: true })}
          />
        </div>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="description">
            description
          </label>
          <textarea
            style={{ resize: "none" }}
            className={s.form__input}
            id={"description"}
            {...register("description")}
          ></textarea>{" "}
        </div>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="dueDate">
            due date
          </label>
          <input
            type="date"
            className={s.form__input}
            id={"dueDate"}
            {...register("dueDate")}
          />
        </div>
        <div className={`${s.form__inputWrapper} ${s.inputWrapperCategory}`}>
          <label
            className={`${s.form__label} ${s.inputWrapperCategory__label}`}
            htmlFor="categoryId"
          >
            category
          </label>
          <select
            className={`${s.form__select} ${s.inputWrapperCategory__select}`}
            id={"categoryId"}
            {...register("categoryId", { required: true })}
          >
            {getCategoryOptionValues().map((option) => (
              <option key={option.key} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setNewCategoryModalOpen(!newCategoryModalOpen)}
            type="button"
            className={`${s.form__createNewCategoryButton} ${s.inputWrapperCategory__button}`}
          >
            new
          </button>

          <div
            className={`${s.newCategoryModal} ${getCategoryModalVisibilityClassName()}`}
          ></div>
        </div>
        <div className={s.form__inputWrapper}>
          <label className={s.form__label} htmlFor="priority">
            priority
          </label>
          <select
            className={s.form__select}
            id={"priority"}
            {...register("priority")}
          >
            <option value="">Choose priority</option>

            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>

        {getCompletionCheckbox(modalType, register)}
        <div className={s.form__buttonsWrapper}>
          {getDeleteButton(
            modalType,
            userId,
            setVisibility,
            taskToConfigure,
            setTasks,
            tasks,
          )}

          <button className={getButtonClassName()} type="submit">
            {getSubmitName()}
          </button>
        </div>
      </form>

      <NewCategoryForm
        newCategoryModalOpen={newCategoryModalOpen}
        setNewCategoryModalOpen={setNewCategoryModalOpen}
        onNewCategoryId={(categoryId) => setNewCategoryId(categoryId)}
      />

      {newCategoryModalOpen ? (
        <div
          onClick={() => setNewCategoryModalOpen(false)}
          className={s.hideBackgroundWhenNewCategoryIsOpen}
        ></div>
      ) : null}
    </div>
  );
}

// utils function returning JSX,  might need to put this into a seperate compoent..
function getCompletionCheckbox(
  modalType: string,
  register: UseFormRegister<Inputs>,
) {
  if (modalType !== "configure") return;

  return (
    <div className={s.form__completionCheckboxInputWrapper}>
      <label className={s.form__label} htmlFor="complete">
        mark as complete:
      </label>
      <input
        className={s.form__completionCheckboxInputWrapper__checkboxInput}
        id={"complete"}
        type="checkbox"
        {...register("priority")}
      />
    </div>
  );
}

function getDeleteButton(
  modalType: string,
  userId: string,
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>,
  tasktoConfigure: TasksInterface | undefined,
  setTasks: React.Dispatch<React.SetStateAction<TasksInterface[]>>,
  tasks: Array<TasksInterface>,
) {
  if (modalType !== "configure") return;

  return (
    <button
      onClick={() =>
        deleteTask(userId, setVisibility, tasktoConfigure, setTasks, tasks)
      }
      type="button"
      className={s.form__deleteButton}
    >
      Delete
    </button>
  );
}

// ----------------- API CALLS -----------------

async function deleteTask(
  userId: string,
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>,
  tasktoConfigure: TasksInterface | undefined,
  setTasks: React.Dispatch<React.SetStateAction<TasksInterface[]>>,
  tasks: Array<TasksInterface>,
) {
  if (!userId) {
    console.error("No userId id found");
    return;
  }
  const taskId = tasktoConfigure?._id;
  try {
    const response = await axios.delete(
      `http://${import.meta.env.VITE_HOSTURL}:3000/tasks/delete/${taskId}`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      console.log("Task deleted successfully");
      setVisibility(false);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } else {
      console.log("Failed to delete task: ", response.status);
    }

    console.log("Modal.tsx - configureTask/deleteTask: ", response);
  } catch (error) {
    console.error("An error occurred while deleting the task: ", error);
  }
}

async function createTask(
  data: Inputs,
  userId: string,
  addTask: (newTask: TasksInterface) => void,
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

async function updateTask(
  data: Inputs,
  userId: string,
  tasktoConfigure: TasksInterface | undefined,
  setTasks: React.Dispatch<React.SetStateAction<TasksInterface[]>>,
  tasks: Array<TasksInterface>,
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>,
) {
  console.log("data: ", data);
  const taskId = tasktoConfigure?._id;
  const { title, description, dueDate, categoryId, priority } = data;

  if (!userId) {
    console.error("No userId id found");
    return;
  }
  if (!taskId) {
    console.error("No task id found");
    return;
  }
  try {
    const response = await axios.put(
      `http://${import.meta.env.VITE_HOSTURL}:3000/tasks/configuretask/${taskId}`,
      data,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      console.log("Task updated successfully");

      setTasks(
        tasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                title: title ? title : task.title,
                description: description ? description : task.description,
                dueDate: dueDate ? dueDate : task.dueDate,
                categoryId: categoryId ? categoryId : task.categoryId,
                priority: priority ? priority : task.priority,
              }
            : task,
        ),
      );

      setVisibility(false);
    } else {
      console.log("Failed to update task: ", response.status);
    }

    console.log("TaskConfigureModal.tsx - updatetaskk: ", response);
  } catch (error) {
    console.error("An error occurred while creating the task: ", error);
  }
}
