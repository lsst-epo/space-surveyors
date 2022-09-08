import { createContext } from "react";

const DimensionsContext = createContext({
  aspectRatio: null,
  fullWidth: null,
  fullHeight: null,
});

export const DimensionsProvider = DimensionsContext.Provider;

export default DimensionsContext;
