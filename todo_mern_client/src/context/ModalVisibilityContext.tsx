import { useState, createContext } from "react";

interface ModalVisibilityType {}

interface ModalVisibilityProps {
  children: React.ReactNode;
}

export const ModalVisibilityContext = createContext<
  ModalVisibilityType | undefined
>(undefined);

export function ModalVisibilityProvider({ children }: ModalVisibilityProps) {
  const value = {};

  return (
    <ModalVisibilityContext.Provider value={value}>
      {children}
    </ModalVisibilityContext.Provider>
  );
}
