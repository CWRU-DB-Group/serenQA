import {createContext, useContext} from "react";

export const UserContext = createContext({
  userEmail: "",
  setUserEmail: () => {
  },
  isLoggedIn: false,
  setIsLoggedIn: () => {
  },
})

export const useUser = () => useContext(UserContext)