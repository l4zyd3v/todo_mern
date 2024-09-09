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
  categorySettingsVisibility: boolean | null;
  setCategorySettingsVisibility: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
}

interface ModalVisibilityProps {
  children: React.ReactNode;
}

export const ModalVisibilityContext = createContext<ModalVisibilityType>({
  taskConfigureModalVisibility: null,
  setTaskConfigureModalVisibility: () => null,
  taskCreateModalVisibility: null,
  setTaskCreateModalVisibility: () => null,
  categoryModalVisibility: null,
  setCategoryModalVisibility: () => null,
  categorySettingsVisibility: null,
  setCategorySettingsVisibility: () => null,
});

export function ModalVisibilityProvider({ children }: ModalVisibilityProps) {
  const [taskConfigureModalVisibility, setTaskConfigureModalVisibility] =
    useState<null | boolean>(null);
  const [taskCreateModalVisibility, setTaskCreateModalVisibility] = useState<
    null | boolean
  >(null);
  const [categoryModalVisibility, setCategoryModalVisibility] = useState<
    null | boolean
  >(null);
  const [categorySettingsVisibility, setCategorySettingsVisibility] = useState<
    null | boolean
  >(null);

  const value = {
    taskConfigureModalVisibility,
    setTaskConfigureModalVisibility,
    taskCreateModalVisibility,
    setTaskCreateModalVisibility,
    categoryModalVisibility,
    setCategoryModalVisibility,
    categorySettingsVisibility,
    setCategorySettingsVisibility,
  };

  return (
    <ModalVisibilityContext.Provider value={value}>
      {children}
    </ModalVisibilityContext.Provider>
  );
}
