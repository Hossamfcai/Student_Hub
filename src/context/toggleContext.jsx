import { createContext } from "react";

export const ToggleContext = createContext({
  toggleSidebar: () => {},
  isOpen: false,
});
