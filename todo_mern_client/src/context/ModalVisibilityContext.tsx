import { useState, createContext } from "react";

interface ModalVisibilityType {
  taskConfigureModalVisibility: boolean | null;
  setTaskConfigureModalVisibility: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  taskCreateModalVisibility: boolean | null;
  setTaskCreateModalVisibility: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  categoryModalVisibility: boolean | null;
  setCategoryModalVisibility: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
}

interface ModalVisibilityProps {
  children: React.ReactNode;
}

export const ModalVisibilityContext = createContext<
  ModalVisibilityType | undefined
>(undefined);

export function ModalVisibilityProvider({ children }: ModalVisibilityProps) {
  const [taskConfigureModalVisibility, setTaskConfigureModalVisibility] =
    useState<null | boolean>(null);
  const [taskCreateModalVisibility, setTaskCreateModalVisibility] = useState<
    null | boolean
  >(null);
  const [categoryModalVisibility, setCategoryModalVisibility] = useState<
    null | boolean
  >(null);

  const value = {
    taskConfigureModalVisibility,
    setTaskConfigureModalVisibility,
    taskCreateModalVisibility,
    setTaskCreateModalVisibility,
    categoryModalVisibility,
    setCategoryModalVisibility,
  };

  return (
    <ModalVisibilityContext.Provider value={value}>
      {children}
    </ModalVisibilityContext.Provider>
  );
}
