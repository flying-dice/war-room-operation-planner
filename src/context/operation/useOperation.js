import { useContext } from "react";
import { OpeartionContext } from "./OpeartionContext";

export const useOperation = () => useContext(OpeartionContext)