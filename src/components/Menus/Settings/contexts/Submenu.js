import { createContext } from "react";
import PropTypes from "prop-types";

const SubmenuContext = createContext(null);

export const SubmenuProvider = SubmenuContext.Provider;

export default SubmenuContext;
