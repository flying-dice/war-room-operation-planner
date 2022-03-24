import { useMapbox } from "../useMapbox";

export const useCombineTool = () => {
  const { draw } = useMapbox();

  const combineFeatures = () => {
    draw.combineFeatures();
  };

  const uncombineFeatures = () => {
    draw.uncombineFeatures();
  };

  return { combineFeatures, uncombineFeatures };
};
