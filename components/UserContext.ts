import {createContext, useContext} from "react";

export const UserContext = createContext({
  userEmail: "",
  setUserEmail: (email: string) => {
  },
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {
  },
})

export const useUser = () => useContext(UserContext)