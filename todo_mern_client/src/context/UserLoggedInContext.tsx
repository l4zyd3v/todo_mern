import { useState, createContext, Dispatch, SetStateAction } from "react";

interface UserLoggedInContextType {
  userLoggedIn: boolean;
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const UserLoggedInContext = createContext<UserLoggedInContextType>({
  userLoggedIn: false,
  setUserLoggedIn: () => {},
});

interface userLoggedInContextProviderProps {
  children: React.ReactNode;
}

export function UserLoggedInContextProvider({
  children,
}: userLoggedInContextProviderProps) {
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const value = { userLoggedIn, setUserLoggedIn };

  return (
    <UserLoggedInContext.Provider value={value}>
      {children}
    </UserLoggedInContext.Provider>
  );
}
