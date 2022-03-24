import Editor from "@monaco-editor/react";
import { Icon, Stack, useTheme } from "@fluentui/react";
import React from "react";
import { v4 } from "uuid";
import download from "js-file-download";
import styles from "./Editor.module.css";
import schema from "../validation/operation.schema.json";
import shortId from "shortid";
import { useValidator } from "../validation/useValidator";
import { useMapbox } from "../@mapbox";
import { useToast } from "../@ui/toasts/useToast";
import { truncate } from "@turf/turf";

const debug = require("debug")("flying-dice:CodeEditor");

export const CodeEditor = ({ operation, onChange }) => {
  const { showError } = useToast();
  const { map, draw } = useMapbox();
  const { semanticColors } = useTheme();
  const { validateOperation, error } = useValidator();

  const handleEditorWillMount = (monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      hover: true,
      completion: true,
      format: true,
      schemas: [
        {
          fileMatch: ["*"],
          schema,
        },
      ],
    });
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.addAction({
      id: "make-uuid",
      label: "Generate UUID",
      contextMenuGroupId: "helpers",
      run: (ed) => {
        ed.trigger("keyboard", "type", { text: v4() });
      },
    });

    editor.addAction({
      id: "make-short-id",
      label: "Generate Short ID",
      contextMenuGroupId: "helpers",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyI,
      ],
      run: (ed) => {
        ed.trigger("keyboard", "type", { text: shortId.generate() });
      },
    });

    editor.addAction({
      id: "insert-selection",
      label: "Insert Geo Selection",
      contextMenuGroupId: "map-actions",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyG,
      ],
      run: (ed) => {
        const { features } = draw.getSelected();
        if (features.length > 1) {
          showError("Select only 1 Geometry");
          return;
        }
        const p = ed.getPosition();
        ed.executeEdits("", [
          {
            range: new monaco.Range(
              p.lineNumber,
              p.column,
              p.lineNumber,
              p.column
            ),
            text: JSON.stringify(truncate(features[0], { precision: 5 })),
          },
        ]);
      },
    });

    editor.addAction({
      id: "export-selection",
      label: "Insert Selected Geo to Map",
      contextMenuGroupId: "map-actions",
      run: (ed) => {
        const feature = JSON.parse(
          ed.getModel().getValueInRange(ed.getSelection())
        );
        debug(`Adding Feature to Map ${JSON.stringify(feature)}`);
        draw.add(feature);
      },
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      download(editor.getValue(), `export.json`, "application/json");
    });
  };

  const handleChanges = (value) => {
    try {
      const op = JSON.parse(value);
      validateOperation(op);
      onChange(op);
    } catch (e) {
      console.warn("Failed to Handle Changes", e);
    }
  };

  return (
    <Stack>
      {map && draw && (
        <Editor
          className={styles.editor}
          defaultLanguage="json"
          value={JSON.stringify(operation, undefined, 2)}
          onChange={handleChanges}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            wordWrap: "wordWrapColumn",
            wordWrapColumn: 80,
          }}
        />
      )}
      <Icon
        className={styles.validIcon}
        style={{
          color: error ? semanticColors.errorIcon : semanticColors.successIcon,
        }}
        iconName={error ? "StatusErrorFull" : "CompletedSolid"}
      />
    </Stack>
  );
};
