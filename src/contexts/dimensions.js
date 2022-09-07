import { createContext } from "react";

const DimensionsContext = createContext({
  boundingRect: null,
  aspectRatio: null,
  fullWidth: null,
  fullHeight: null,
});

export const DimensionsProvider = DimensionsContext.Provider;

export default DimensionsContext;
