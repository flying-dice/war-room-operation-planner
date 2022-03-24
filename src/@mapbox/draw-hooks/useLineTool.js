import { useMapbox } from "../useMapbox";

export const useLineTool = () => {
  const { draw } = useMapbox();

  const enableDrawLineMode = () => {
    draw.changeMode("draw_line_string");
  };

  return { enableDrawLineMode };
};
