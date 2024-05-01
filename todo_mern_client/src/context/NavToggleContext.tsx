import { useState, createContext, Dispatch, SetStateAction } from "react";

interface NavToggleContextType {
  toggleNav: boolean;
  setToggleNav: Dispatch<SetStateAction<boolean>>;
}

export const NavToggleContext = createContext<NavToggleContextType>({
  toggleNav: false,
  setToggleNav: () => {},
});

interface NavToggleContextProviderProps {
  children: React.ReactNode;
}

export function NavToggleContextProvider({
  children,
}: NavToggleContextProviderProps) {
  const [toggleNav, setToggleNav] = useState(false);

  const value = { toggleNav, setToggleNav };

  return (
    <NavToggleContext.Provider value={value}>
      {children}
    </NavToggleContext.Provider>
  );
}
