import { useMemo, useState } from "react";
import { Slider, Stack, TextField, useTheme } from "@fluentui/react";
import { Window } from "../@ui/Window";
import { TurfUtils } from "../@turf";
import { lineString } from "@turf/turf";
import { Layers } from "../layers";
import { useMilSymbol } from "../hooks/useMilSymbol";
import { useGeoJsonLayers } from "../hooks/useGeoJsonLayers";
import { affiliationColor } from "../utils/affiliation-color";
import { SymbolFactory } from "../@symbology";
import { useAffiliation } from "../hooks/useAffiliation";

export const Brigade = ({ division, brigade, grid }) => {
  const { spacing } = useTheme();
  const [showWindow, setShowWindow] = useState(false);
  const affiliation = useAffiliation(brigade.country);

  const brigadePos = useMemo(
    () => TurfUtils.getCellCenter(grid, brigade.location),
    [brigade.location, grid]
  );

  const divisionPos = useMemo(
    () => TurfUtils.getCellCenter(grid, division.location),
    [division.location, grid]
  );

  // Fill Brigade Cell
  useGeoJsonLayers(
    useMemo(() => TurfUtils.getCell(grid, brigade.location), [brigade, grid]),
    useMemo(
      () => [Layers.getBrigadeFill({ color: affiliationColor[affiliation] })],
      [brigade.location, affiliation]
    )
  );

  // Draw Line Between Brigade and Division
  useGeoJsonLayers(
    useMemo(
      () => lineString([brigadePos, divisionPos]),
      [brigadePos, divisionPos]
    ),
    useMemo(
      () => [
        Layers.getDivisionBrigadeLink({
          color: affiliationColor[affiliation],
        }),
      ],
      [affiliation]
    )
  );

  // Draw Brigade on Map
  useMilSymbol(
    useMemo(
      () => SymbolFactory.forGroundUnit(brigade, division, { affiliation }),
      [brigade]
    ),
    brigadePos,
    () => setShowWindow(true)
  );

  return (
    <>
      <Window
        isOpen={showWindow}
        onDismiss={() => setShowWindow(false)}
        title={brigade.name}
        width="min-content"
        height="min-content"
      >
        <Stack tokens={{ childrenGap: spacing.s1, padding: spacing.s1 }}>
          <TextField readOnly label="Id" value={brigade.id} />
          <TextField readOnly label="Type" value={brigade.type} />
          <TextField readOnly label="Name" value={brigade.name} />
          <Slider
            readOnly
            label="Health"
            value={brigade.health}
            max={1}
            valueFormat={(value) => `${value * 100}%`}
          />
        </Stack>
      </Window>
    </>
  );
};
