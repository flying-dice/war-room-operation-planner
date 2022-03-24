import { createContext } from "react";
import { noop } from "lodash";

export const ToastContext = createContext({
  show: noop,
  showError: noop,
});
