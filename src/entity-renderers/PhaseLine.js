import { useGeoJsonLayers } from "../hooks/useGeoJsonLayers";
import { Layers } from "../layers";
import { useMemo } from "react";

export const PhaseLine = ({ phaseLine }) => {
  useGeoJsonLayers(
    phaseLine.location,
    useMemo(
      () => Layers.getPhaseLineLayers({ label: `PL ${phaseLine.name}` }),
      [phaseLine.name]
    )
  );

  return <></>;
};
