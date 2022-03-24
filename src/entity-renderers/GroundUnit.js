import { useEffect, useState } from "react";
import { Marker } from "mapbox-gl";
import { Slider, Stack, TextField, useTheme } from "@fluentui/react";
import { useMapbox } from "../@mapbox";
import { useMemoWithHash } from "../hooks/useMemoWithHash";
import { Window } from "../@ui/Window";
import { SymbolFactory } from "../@symbology";
import { TurfUtils } from "../@turf";
import { useAffiliation } from "../hooks/useAffiliation";

const debug = require("debug")("flying-dice:GroundUnit");

export const GroundUnit = ({ unit, grid, coalitions }) => {
  const { spacing } = useTheme();
  const { map } = useMapbox();
  const memoizedUnit = useMemoWithHash(unit);
  const [showWindow, setShowWindow] = useState(false);
  const affiliation = useAffiliation(coalitions, unit.country);

  useEffect(() => {
    let marker;
    if (map && memoizedUnit.location && grid) {
      debug(`Adding Marker for ${memoizedUnit.id} - ${memoizedUnit.name}`);

      const lngLat = TurfUtils.getCellComPosition(grid, memoizedUnit.location);
      const symbol = SymbolFactory.forGroundUnit(
        memoizedUnit,
        affiliation
      ).asCanvas();
      marker = new Marker(symbol).setLngLat(lngLat).addTo(map);

      symbol.addEventListener("click", () => {
        setShowWindow(true);
      });
    }

    return () => {
      debug(`Removing Marker for ${memoizedUnit.id} - ${memoizedUnit.name}`);
      marker?.remove();
    };
  }, [map, memoizedUnit, grid]);

  return (
    <Window
      isOpen={showWindow}
      onDismiss={() => setShowWindow(false)}
      title={memoizedUnit.name}
      width="min-content"
      height="min-content"
    >
      <Stack tokens={{ childrenGap: spacing.s1, padding: spacing.s1 }}>
        <TextField readOnly label="Id" value={memoizedUnit.id} />
        <TextField readOnly label="Type" value={memoizedUnit.type} />
        <TextField readOnly label="Name" value={memoizedUnit.name} />
        <Slider
          readOnly
          label="Health"
          value={memoizedUnit.health}
          max={1}
          valueFormat={(value) => `${value * 100}%`}
        />
      </Stack>
    </Window>
  );
};
