import { createContext } from "react";

export const TodoListContext = createContext({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {},
});
