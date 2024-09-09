import { useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import { ModalVisibilityContext } from "../../context/ModalVisibilityContext";

const useDeleteCategory = () => {
  const { setCategories, categories, selectedCategory } =
    useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);
  const { categoryModalVisibility, setCategoryModalVisibility } = useContext(
    ModalVisibilityContext,
  );

  async function deleteCategory(
    setSettingsVisibility: React.Dispatch<React.SetStateAction<null | boolean>>,
  ) {
    if (!userId) {
      console.error("No userId id found");
      return;
    }
    const categoryId = selectedCategory?._id;
    try {
      const response = await axios.delete(
        `http://${import.meta.env.VITE_HOSTURL}:3000/deletecategory/${categoryId}`,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        console.log(response.data.message);
        setCategories(
          categories.filter((category) => category._id !== categoryId),
        );
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
