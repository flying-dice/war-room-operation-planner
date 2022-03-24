import { createContext } from "react";

export const MapboxContext = createContext({
  map: undefined,
  draw: undefined,
  containerId: undefined,
});
