import { useState, createContext } from "react";
import { CategoriesInterface } from "../types/categoriesInterface";

interface CategoriesContextType {
  setCategories: (value: CategoriesInterface[]) => void;
  addCategory: (newCategory: CategoriesInterface) => void;
  categories: Array<CategoriesInterface>;
}

interface CategoriesContextProviderProps {
  children: React.ReactNode;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  setCategories: () => {},
  addCategory: () => {},
  categories: [],
});

export function CategoriesContextProvider({
  children,
}: CategoriesContextProviderProps) {
  const [categories, setCategories] = useState<CategoriesInterface[]>([]);

  const addCategory = (newCategory: CategoriesInterface) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const value = { categories, setCategories, addCategory };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
