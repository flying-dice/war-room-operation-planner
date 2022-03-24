import { useMapbox } from "../useMapbox";

export const usePolyTool = () => {
  const { draw } = useMapbox();

  const enableDrawPolyMode = () => {
    draw.changeMode("draw_polygon");
  };

  return { enableDrawPolyMode };
};
