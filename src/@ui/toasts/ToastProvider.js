import { ToastContext } from "./ToastContext";
import { useState } from "react";
import {
  MessageBar,
  MessageBarType,
  Stack,
  Text,
  useTheme,
} from "@fluentui/react";
import styles from "./Toast.module.css";

export const ToastProvider = ({ children }) => {
  const { spacing } = useTheme();
  const [toast, setToast] = useState(undefined);

  const show = (toast) => {
    setToast(toast);
    setTimeout(() => {
      setToast(undefined);
    }, 5000);
  };

  const showError = (error) => {
    show({
      messageBarType: MessageBarType.error,
      content: (
        <Stack gap={spacing.s1}>
          <Text variant="mediumPlus">Error</Text>
          <Text>{error}</Text>
        </Stack>
      ),
    });
  };

  return (
    <ToastContext.Provider value={{ show, showError }}>
      {children}
      {toast && (
        <MessageBar className={styles.toast} {...toast}>
          {toast.content}
        </MessageBar>
      )}
    </ToastContext.Provider>
  );
};
