import { createContext } from "react";

const MenuContext = createContext(null);

export const MenuProvider = MenuContext.Provider;

export default MenuContext;
