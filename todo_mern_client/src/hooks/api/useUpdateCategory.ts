import { useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";

const useUpdateCategory = () => {
  const { setCategories, categories, selectedCategory, setSelectedCategory } =
    useContext(DataContext);
  const { userId } = useContext(UserLoggedInContext);

  async function updateCategory(data, setVisibility) {
    const categoryId = selectedCategory?._id;
    const { name, color } = data;

    if (!userId) {
      console.error("No userId id found");
      return;
    }
    if (!categoryId) {
      console.error("No task id found");
      return;
    }
    try {
      const response = await axios.put(
        `http://${import.meta.env.VITE_HOSTURL}:3000/categories/configurecategories/${categoryId}`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        console.log(response.data.message);

        if (response.data.modified === false) {
          console.log("No changes were made");
          setVisibility(false);
          return;
        }

        setCategories(
          categories.map((category) =>
            category._id === categoryId
              ? {
                  ...category,
                  name: name ? name : category.name,
                  color: color ? color : category.color,
                }
              : category,
          ),
        );

        setVisibility && setVisibility(false);
      } else {
        console.log("Failed to update category: ", response.status);
      }
    } catch (error) {
      console.error(
        "An error occurred while trying to configure the category: ",
        error,
      );
    }
  }

  return updateCategory;
};

export default useUpdateCategory;
