import {
  ContextualMenu,
  IconButton,
  Modal,
  Stack,
  Text,
  useTheme,
} from "@fluentui/react";
import React, { useMemo } from "react";
import { useCreateId } from "./useCreateId";

export const Window = ({
  title,
  children,
  isOpen,
  onDismiss,
  width,
  height,
}) => {
  const [dragHandleId, dragHandleSelector] = useCreateId();
  const { palette, spacing } = useTheme();

  const headerStyles = useMemo(
    () => ({
      root: {
        backgroundColor: palette.themeLight,
        padding: spacing.s1,
        userSelect: "none",
        cursor: "default",
      },
    }),
    [palette, spacing]
  );

  const modalStyles = useMemo(
    () => ({
      root: {
        pointerEvents: "none",
      },
      main: {
        height: height || "768px",
        width: width || "1024px",
        pointerEvents: "auto",
        resize: "both",
      },
      scrollableContent: {
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
    }),
    []
  );

  const contentStyles = useMemo(
    () => ({
      root: {
        padding: spacing.s1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      },
    }),
    [spacing]
  );

  return (
    <Modal
      styles={modalStyles}
      isOpen={isOpen}
      isModeless
      dragOptions={{
        menu: ContextualMenu,
        dragHandleSelector,
      }}
      onDismiss={onDismiss}
    >
      <Stack
        id={dragHandleId}
        styles={headerStyles}
        horizontal
        verticalAlign="center"
        horizontalAlign="space-between"
      >
        <Text variant={"large"}>{title}</Text>
        <IconButton iconProps={{ iconName: "Cancel" }} onClick={onDismiss} />
      </Stack>
      <Stack styles={contentStyles}>{children}</Stack>
    </Modal>
  );
};
