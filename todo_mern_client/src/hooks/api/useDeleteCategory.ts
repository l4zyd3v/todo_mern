import { useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import { ModalVisibilityContext } from "../../context/ModalVisibilityContext";

const useDeleteCategory = () => {
  const { setCategories, categories, selectedCategory, setTasks, tasks } =
    useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);
  const { categoryModalVisibility, setCategoryModalVisibility } = useContext(
    ModalVisibilityContext,
  );

  async function deleteCategory(
    setSettingsVisibility: React.Dispatch<React.SetStateAction<null | boolean>>,
    deletionType: string,
  ) {
    if (!userId) {
      console.error("No userId id found");
      return;
    }

    const categoryId = selectedCategory?._id;

    const url =
      deletionType === "deleteCatNoTasks"
        ? `http://${import.meta.env.VITE_HOSTURL}:3000/deletecategory/${categoryId}`
        : deletionType === "deleteCatWithTasks"
          ? `http://${import.meta.env.VITE_HOSTURL}:3000/deletecategory-tasks/${categoryId}`
          : "";

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        setCategories(
          categories.filter((category) => category._id !== categoryId),
        );
        if (deletionType === "deleteCatWithTasks") {
          setTasks(
            tasks.filter((task) => task.categoryId !== selectedCategory?._id),
          );
        }
        setSettingsVisibility(false);
        setCategoryModalVisibility(false);
      } else {
        console.log("Failed to delete category: ", response.status);
      }
    } catch (error) {
      console.error("An error occurred while deleting the category: ", error);
    }
  }

  return deleteCategory;
};

export default useDeleteCategory;
