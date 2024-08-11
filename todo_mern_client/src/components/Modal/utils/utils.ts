import { CategoriesInterface } from "../../../types";
import { UseFormSetValue } from "react-hook-form";
import { TasksInterface } from "../../../types/tasksInterface";
import { Inputs } from "../types/index";

// general
function generalUtilsHandler(
  visibility: boolean | null,
  s: CSSModuleClasses,
  modalType: string,
) {
  return {
    getModalClassName: () => {
      return `${s.Modal} ${modalType === "configure" ? s.ModalConfigureSpecific : ""} ${
        visibility
          ? s.ModalVisible
          : visibility === false
            ? s.ModalHide
            : visibility === null
              ? s.defaultVisibilityHidden
              : ""
      }`;
    },

    getFormClassName: () => {
      return `${s.form} ${modalType === "create" ? s.formCreateModalSpecfic : modalType === "configure" ? s.formConfigureModalSpecfic : ""}`;
    },

    getSubmitName: () => {
      if (modalType === "create") {
        return "Create Task";
      } else if (modalType === "configure") {
        return "Update Task";
      }
    },

    getButtonClassName: () => {
      return `${s.form__submit} ${modalType === "create" ? s.form__submitCreate : modalType === "configure" ? s.form__submitConfigure : ""}`;
    },
  };
}

// TaskConfigure specific
function taskConfigureUtilsHandler(
  taskToConfigure: TasksInterface | undefined,
  setValue: UseFormSetValue<Inputs>,
) {
  return {
    getTaskToConfigureValues: () => {
      if (taskToConfigure) {
        setValue("title", taskToConfigure.title);
        setValue("description", taskToConfigure.description);
        setValue("dueDate", taskToConfigure.dueDate);
        setValue("categoryId", taskToConfigure.categoryId);
        setValue("priority", taskToConfigure.priority);
      }
    },
  };
}

// category specific
function categoryUtilsHandler(
  categories: CategoriesInterface[],
  newCategoryModalOpen: boolean,
  s: CSSModuleClasses,
) {
  return {
    getCategoryOptionValues: () => {
      return categories.map((category) => ({
        key: category._id,
        value: category._id,
        name: category.name,
      }));
    },

    getDefaultCategoryId: () => {
      const defaultCategoryId = categories.find(
        (category) => category.name === "personal",
      )?._id;
      return defaultCategoryId;
    },

    getCategoryModalVisibilityClassName: () => {
      return newCategoryModalOpen ? s.newCategoryModalOpen : "";
    },
  };
}

export { generalUtilsHandler, taskConfigureUtilsHandler, categoryUtilsHandler };
