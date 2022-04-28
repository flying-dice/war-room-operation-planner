import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Stack, useTheme } from "@fluentui/react";
import remarkGfm from "remark-gfm";
import useAxios from "axios-hooks";
import pupa from "pupa";
import { Window } from "../@ui/Window";
import template from "./OperationsOrder.md";

export const OpordWindow = ({ operation, isOpen, onDismiss }) => {
  const { spacing } = useTheme();
  const [{ data }] = useAxios(template);

  const content = useMemo(
    () => data && pupa(data, operation, { ignoreMissing: true }),
    [data, operation]
  );

  return (
    <Window isOpen={isOpen} onDismiss={onDismiss} title="Operations Order">
      <Stack tokens={{ padding: spacing.s1, margin: spacing.s1 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </Stack>
    </Window>
  );
};
