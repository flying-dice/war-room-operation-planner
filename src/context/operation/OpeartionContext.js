import { createContext } from "react";
import { exampleOperation } from "../../example";

export const OpeartionContext = createContext({
  operation: exampleOperation,
  setOperation: () => {}
});