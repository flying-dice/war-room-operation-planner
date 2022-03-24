import { useMapbox } from "../useMapbox";
import { dissolve, unkinkPolygon } from "@turf/turf";

export const useDissolveTool = () => {
  const { draw } = useMapbox();

  const dissolveSelected = () => {
    const selectedIds = draw.getSelectedIds();
    const selectedFeatures = draw.getSelected();
    let dissolveIterations = 0;
    let dissolved = dissolve(unkinkPolygon(selectedFeatures));
    while (dissolved.features.length > 1 && dissolveIterations < 3) {
      dissolved = dissolve(dissolved);
      dissolveIterations++;
    }
    draw.add(dissolved);
    draw.delete(selectedIds);
  };

  return { dissolveSelected };
};
