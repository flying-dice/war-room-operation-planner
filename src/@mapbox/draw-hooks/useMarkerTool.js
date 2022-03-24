import { useMapbox } from "../useMapbox";

export const useMarkerTool = () => {
  const { draw } = useMapbox();

  const enableDrawPointMode = () => {
    draw.changeMode("draw_point");
  };

  return { enableDrawPointMode };
};
