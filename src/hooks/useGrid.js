import { useEffect, useMemo, useState } from "react";
import { useMapbox } from "../@mapbox";
import { TurfUtils } from "../@turf";
import { config } from "../config";
import { getDebugger } from "../debug";
import { difference, dissolve } from "@turf/turf";
import { useGeoJsonLayers } from "./useGeoJsonLayers";
import { Layers } from "../layers";

const wholeEarth = {
  type: "Polygon",
  coordinates: [
    [
      [-180, 90],
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90],
    ],
  ],
};

const debug = getDebugger("useGrid");

export const useGrid = (area) => {
  const { map } = useMapbox();

  // Calculate Grid
  const grid = useMemo(
    () => TurfUtils.hexGrid(area, config.gridSide, config.intersectThreshold),
    [map, area]
  );

  // Render Background for outside AO
  useGeoJsonLayers(
    useMemo(() => difference(wholeEarth, dissolve(grid).features[0]), [grid]),
    useMemo(() => [{ type: "fill", paint: { "fill-opacity": 0.2 } }], [])
  );

  // Render Grid on Map
  const gridLayer = useGeoJsonLayers(
    grid,
    useMemo(() => Layers.getGridFillLayers(), [])
  );

  const [hoveredCell, setHoveredCell] = useState();

  // Registering Mouse Hover Listeners
  useEffect(() => {
    if (map && hoveredCell) {
      map.setFeatureState(
        { source: gridLayer.id, id: hoveredCell?.id },
        { hover: true }
      );
    }

    return () => {
      if (map && hoveredCell) {
        map.setFeatureState(
          { source: gridLayer.id, id: hoveredCell?.id },
          { hover: false }
        );
      }
    };
  }, [map, hoveredCell, gridLayer]);

  useEffect(() => {
    if (gridLayer?.id) {
      debug("Watching for MouseMoves on %s", gridLayer.id);
      map.on("mousemove", gridLayer.layerIds[0], ({ features }) => {
        setHoveredCell(features[0]);
      });

      map.on("mouseleave", gridLayer.layerIds[0], () => {
        setHoveredCell(undefined);
      });
    }
  }, [map, gridLayer]);

  return { grid, hoveredCell };
};
