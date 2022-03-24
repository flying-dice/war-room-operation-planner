import { useMapbox } from "../@mapbox";
import { useEffect, useState } from "react";
import { useCreateId } from "../@ui/useCreateId";
import { difference } from "@turf/turf";
import { TurfUtils } from "../@turf";
import { useMemoWithHash } from "./useMemoWithHash";
import { config } from "../config";

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

const debug = require("debug")("flying-dice:useGrid");

export const useGrid = (operation) => {
  const { map, activeStyle } = useMapbox();
  const area = useMemoWithHash(operation.area);

  const [bboxsid] = useCreateId();
  const [bboxlid] = useCreateId();
  const [gsid] = useCreateId();
  const [glidFill] = useCreateId();
  const [glidLine] = useCreateId();
  const [hoveredCell, setHoveredCell] = useState();
  const [grid, setGrid] = useState();

  useEffect(() => {
    if (map && hoveredCell) {
      map.setFeatureState(
        { source: gsid, id: hoveredCell?.id },
        { hover: true }
      );
    }

    return () => {
      if (map && hoveredCell) {
        map.setFeatureState(
          { source: gsid, id: hoveredCell?.id },
          { hover: false }
        );
      }
    };
  }, [map, hoveredCell]);

  useEffect(() => {
    if (map && operation.area) {
      debug("Drawing new Grid");
      const grid_ = TurfUtils.hexGrid(
        operation.area,
        config.gridSide,
        config.intersectThreshold
      );

      map.addSource(bboxsid, {
        type: "geojson",
        data: difference(wholeEarth, operation.area),
      });
      map.addLayer({
        id: bboxlid,
        source: bboxsid,
        type: "fill",
        paint: { "fill-opacity": 0.5 },
      });

      map.addSource(gsid, { type: "geojson", data: grid_ });
      map.addLayer({
        id: glidFill,
        source: gsid,
        type: "fill",
        paint: {
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.2,
            0.1,
          ],
        },
      });
      map.on("mousemove", glidFill, ({ features }) => {
        setHoveredCell(features[0]);
      });

      map.on("mouseleave", glidFill, () => {
        setHoveredCell(undefined);
      });

      map.addLayer({
        id: glidLine,
        source: gsid,
        type: "line",
        paint: {
          "line-opacity": 0.1,
          "line-width": 2,
        },
      });
      setGrid(grid_);
    }

    return () => {
      setGrid(undefined);
      if (map) {
        try {
          map.removeLayer(bboxlid);
        } catch (e) {
          debug(`Failed to Remove Layer with ID ${bboxlid} due to ${e}`);
        }

        try {
          map.removeSource(bboxsid);
        } catch (e) {
          debug(`Failed to Remove Source with ID ${bboxsid} due to ${e}`);
        }

        try {
          map.removeLayer(glidFill);
        } catch (e) {
          debug(`Failed to Remove Layer with ID ${glidFill} due to ${e}`);
        }
        try {
          map.removeLayer(glidLine);
        } catch (e) {
          debug(`Failed to Remove Layer with ID ${glidLine} due to ${e}`);
        }

        try {
          map.removeSource(gsid);
        } catch (e) {
          debug(`Failed to Remove Source with ID ${gsid} due to ${e}`);
        }
      }
    };
  }, [map, gsid, glidLine, glidFill, area, activeStyle]);

  return { grid, hoveredCell };
};
