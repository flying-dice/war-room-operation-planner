import { useState } from "react";
import { exampleOperation } from "../../example";
import { OpeartionContext } from "./OpeartionContext";

export const OperationProvider = ({ children }) => {
  const [operation, setOperation] = useState(exampleOperation);

  return (
    <OpeartionContext.Provider value={{ operation, setOperation }}>
      {children}
    </OpeartionContext.Provider>
  );
};
