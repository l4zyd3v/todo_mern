import { useState, createContext, Dispatch, SetStateAction } from "react";

interface UserLoggedInContextType {
  userLoggedIn: boolean;
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

export const UserLoggedInContext = createContext<UserLoggedInContextType>({
  userLoggedIn: false,
  setUserLoggedIn: () => {},
  userId: "",
  setUserId: () => {},
});

interface userLoggedInContextProviderProps {
  children: React.ReactNode;
}

export function UserLoggedInContextProvider({
  children,
}: userLoggedInContextProviderProps) {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userId, setUserId] = useState("");

  const value = { userLoggedIn, setUserLoggedIn, userId, setUserId };

  return (
    <UserLoggedInContext.Provider value={value}>
      {children}
    </UserLoggedInContext.Provider>
  );
}
