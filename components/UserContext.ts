import {createContext, useContext} from "react";

interface UserContextType {
  userEmail: string;
  setUserEmail: (email: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  userEmail: "",
  setUserEmail: () => {
  },
  isLoggedIn: false,
  setIsLoggedIn: () => {
  },
})

export const useUser = () => useContext(UserContext)