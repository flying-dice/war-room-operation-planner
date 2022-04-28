import { useMemo, useState } from "react";
import { Slider, Stack, TextField, useTheme } from "@fluentui/react";
import { Window } from "../@ui/Window";
import { Brigade } from "./Brigade";
import { TurfUtils } from "../@turf";
import { useGeoJsonLayers } from "../hooks/useGeoJsonLayers";
import { Layers } from "../layers";
import { coalitionColor } from "../utils/coalition-color";
import { useMilSymbol } from "../hooks/useMilSymbol";
import { SymbolFactory } from "../@symbology";
import { featureCollection } from "@turf/turf";

export const Division = ({ division, corps, grid }) => {
  const { spacing } = useTheme();
  const [showWindow, setShowWindow] = useState(false);

  const divisionPos = useMemo(
    () => TurfUtils.getCellCenter(grid, division.location),
    [division.location, grid]
  );

  // Fill Division Cell
  useGeoJsonLayers(
    useMemo(() => TurfUtils.getCell(grid, division.location), [division, grid]),
    useMemo(
      () => [
        Layers.getDivisionFill({ color: coalitionColor[division.coalition] }),
      ],
      [division.coalition]
    )
  );

  // Fill Division Influence Cells
  useGeoJsonLayers(
    useMemo(
      () =>
        featureCollection(
          TurfUtils.getGridNeighboursCells(grid, division.location)
        ),
      [division, grid]
    ),
    useMemo(
      () => [
        Layers.getDivisionInfluenceFill({
          color: coalitionColor[division.coalition],
        }),
      ],
      [division.coalition]
    )
  );

  // Draw Division on Map
  useMilSymbol(
    useMemo(() => SymbolFactory.forGroundUnit(division, corps), [Division]),
    divisionPos,
    () => setShowWindow(true)
  );

  return (
    <>
      <Window
        isOpen={showWindow}
        onDismiss={() => setShowWindow(false)}
        title={division.name}
        width="min-content"
        height="min-content"
      >
        <Stack tokens={{ childrenGap: spacing.s1, padding: spacing.s1 }}>
          <TextField readOnly label="Id" value={division.id} />
          <TextField readOnly label="Type" value={division.type} />
          <TextField readOnly label="Name" value={division.name} />
          <Slider
            readOnly
            label="Health"
            value={division.health}
            max={1}
            valueFormat={(value) => `${value * 100}%`}
          />
        </Stack>
      </Window>
      {division.subordinates?.map((it) => (
        <Brigade key={it.id} division={division} brigade={it} grid={grid} />
      ))}
    </>
  );
};
