import { useState, useContext, useEffect } from "react";
import s from "./taskmodal.module.scss";
import { useForm, SubmitHandler, UseFormSetValue } from "react-hook-form";
import axios from "axios";
import { CategoriesInterface, TasksInterface } from "../../types";
import NewCategoryForm from "./components/NewCategoryForm/NewCategoryForm";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";

// This type should maybe be used in a separate file
type PropTypes = {
  visibility: boolean | null;
  setVisibility: React.Dispatch<React.SetStateAction<boolean | null>>;
  modalType: string;
  taskToConfigure?: TasksInterface;
};

type Inputs = {
  title: string | undefined;
  description?: string;
  dueDate?: string;
  categoryId?: string;
  priority?: string;
};

export default function TaskModal({
  visibility,
  setVisibility,
  modalType,
  taskToConfigure,
}: PropTypes) {
  // states
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);
  // contexts
  const { categories, addTask, setTasks, tasks } = useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (modalType === "configure") {
      updateTask(data, userId, taskToConfigure, setTasks, tasks, setVisibility);
    } else if (modalType === "create") {
      createTask(data, userId, addTask, setVisibility);
    }
  };

  // useEffects
  useEffect(() => {
    if (visibility) {
      // Reset the form when the modal is opened
      reset();
    }
  }, [visibility]);

  console.log("taskToConfigure: ", taskToConfigure);

  useEffect(() => {
    if (modalType !== "configure") return;
    setTaskToConfigureValues(taskToConfigure, setValue);
  }, [visibility]);

  useEffect(() => {
    if (newCategoryId) {
      setValue("categoryId", newCategoryId);
    }
  }, [newCategoryId, setValue]);

  return (
    <div className={getTaskCreateModalClassName(visibility)}>
      <button
        className={s.TaskCreateModal__exitButton}
        onClick={() => setVisibility(false)}
      >
        &times;
      </button>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
            {...register("categoryId")}
          >
            <option value="">Choose category</option>

            {getCategoryOptions(categories)}
          </select>
          <button
            onClick={() => setNewCategoryModalOpen(!newCategoryModalOpen)}
            type="button"
            className={`${s.form__createNewCategoryButton} ${s.inputWrapperCategory__button}`}
          >
            new
          </button>

          <div
            className={`${s.newCategoryModal} ${getCategoryModalVisibilityClassName(newCategoryModalOpen)}`}
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
        <button className={s.form__submit} type="submit">
          {getButtonName(modalType)}
        </button>
      </form>

      <NewCategoryForm
        newCategoryModalOpen={newCategoryModalOpen}
        setNewCategoryModalOpen={setNewCategoryModalOpen}
        onNewCategoryId={(categoryId) =>
          handleNewCategoryId(categoryId, setNewCategoryId)
        }
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

    console.log("TaskCreateModal.tsx - createTask/addTask: ", response);
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
                duedate: dueDate ? dueDate : task.dueDate,
                categoryid: categoryId ? categoryId : task.categoryId,
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

function getCategoryOptions(categories: CategoriesInterface[]) {
  return categories.map((category) => (
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ));
}

function getCategoryModalVisibilityClassName(newCategoryModalOpen: boolean) {
  return newCategoryModalOpen ? s.newCategoryModalOpen : "";
}

const handleNewCategoryId = (
  categoryId: string | null,
  setNewCategoryId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  setNewCategoryId(categoryId);
};

function getTaskCreateModalClassName(visibility: boolean | null) {
  return `${s.TaskCreateModal} ${
    visibility
      ? s.TaskCreateModalVisible
      : visibility === false
        ? s.TaskCreateModalHide
        : ""
  }`;
}

function getButtonName(modalType: string) {
  if (modalType === "create") {
    return "Create Task";
  } else if (modalType === "configure") {
    return "Update Task";
  }
}

// tasktoConfigure functions:

function setTaskToConfigureValues(
  taskToConfigure: TasksInterface | undefined,
  setValue: UseFormSetValue<Inputs>,
) {
  if (taskToConfigure) {
    setValue("title", taskToConfigure.title);
    setValue("description", taskToConfigure.description);
    setValue("dueDate", taskToConfigure.dueDate);
    setValue("categoryId", taskToConfigure.categoryId);
    setValue("priority", taskToConfigure.priority);
  }
}
