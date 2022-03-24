import { createRef } from "react";
import { CommandBarButton, Stack } from "@fluentui/react";
import { useLineTool } from "./draw-hooks/useLineTool";
import { usePolyTool } from "./draw-hooks/usePolyTool";
import { useMarkerTool } from "./draw-hooks/useMarkerTool";
import { useDeleteTool } from "./draw-hooks/useDeleteTool";
import { useImportTool } from "./draw-hooks/useImportTool";
import { useDissolveTool } from "./draw-hooks/useDissolveTool";
import { useCombineTool } from "./draw-hooks/useCombineTool";
import { useMapbox } from "./useMapbox";
import { config } from "./config";

export const DrawCommandBar = () => {
  const { activeStyle, toggleStyle } = useMapbox();
  const { combineFeatures, uncombineFeatures } = useCombineTool();
  const { enableDrawLineMode } = useLineTool();
  const { enableDrawPolyMode } = usePolyTool();
  const { enableDrawPointMode } = useMarkerTool();
  const { deleteAll, deleteSelected } = useDeleteTool();
  const { dissolveSelected } = useDissolveTool();
  const uploadRef = createRef();
  const { upload, handleClick } = useImportTool(uploadRef);

  return (
    <Stack horizontal styles={{ root: { height: 44 } }}>
      <CommandBarButton
        iconProps={{ iconName: "Line" }}
        onClick={enableDrawLineMode}
      >
        Line Tool
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "Shapes" }}
        onClick={enableDrawPolyMode}
      >
        Polygon Tool
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "MapPin" }}
        onClick={enableDrawPointMode}
      >
        Marker Tool
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "Delete" }}
        onClick={deleteSelected}
      >
        Delete Selected
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "RemoveFromTrash" }}
        onClick={deleteAll}
      >
        Delete All
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "Combine" }}
        onClick={combineFeatures}
      >
        Combine
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "Split" }}
        onClick={uncombineFeatures}
      >
        UnCombine
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "Merge" }}
        onClick={dissolveSelected}
      >
        Dissolve
      </CommandBarButton>
      <CommandBarButton iconProps={{ iconName: "Upload" }} onClick={upload}>
        Import
        <input
          ref={uploadRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleClick}
        />
      </CommandBarButton>
      <CommandBarButton
        iconProps={{ iconName: "MapLayers" }}
        onClick={toggleStyle}
      >
        {activeStyle === config.satelliteStyle ? "Normal" : "Satellite"}
      </CommandBarButton>
    </Stack>
  );
};
