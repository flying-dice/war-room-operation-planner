import { useEffect, useState } from "react";
import { Marker } from "mapbox-gl";
import { Slider, Stack, TextField, useTheme } from "@fluentui/react";
import { useMapbox } from "../@mapbox";
import { useMemoWithHash } from "../hooks/useMemoWithHash";
import { Window } from "../@ui/Window";
import { SymbolFactory } from "../@symbology";
import { useAffiliation } from "../hooks/useAffiliation";

const debug = require("debug")("flying-dice:Installation");

export const Installation = ({ installation, coalitions }) => {
  const { spacing } = useTheme();
  const { map } = useMapbox();
  const memoizedInstallation = useMemoWithHash(installation);
  const [showWindow, setShowWindow] = useState(false);
  const affiliation = useAffiliation(coalitions, installation.country);

  useEffect(() => {
    let marker;
    if (map && memoizedInstallation.location.geometry.coordinates) {
      debug(
        `Adding Marker for ${memoizedInstallation.id} - ${memoizedInstallation.name}`
      );

      const symbol = SymbolFactory.forInstallation(
        memoizedInstallation,
        affiliation
      ).asCanvas();
      marker = new Marker(symbol)
        .setLngLat(memoizedInstallation.location.geometry.coordinates)
        .addTo(map);

      symbol.addEventListener("click", () => {
        setShowWindow(true);
      });
    }

    return () => {
      debug(
        `Removing Marker for ${memoizedInstallation.id} - ${memoizedInstallation.name}`
      );

      marker?.remove();
    };
  }, [map, memoizedInstallation]);

  return (
    <Window
      isOpen={showWindow}
      onDismiss={() => setShowWindow(false)}
      title={installation.name}
      width="min-content"
      height="min-content"
    >
      <Stack tokens={{ childrenGap: spacing.s1, padding: spacing.s1 }}>
        <TextField readOnly label="Id" value={installation.id} />
        <TextField readOnly label="Type" value={installation.type} />
        <TextField readOnly label="Name" value={installation.name} />
        <Slider
          readOnly
          label="Health"
          value={installation.health}
          max={1}
          valueFormat={(value) => `${value * 100}%`}
        />
      </Stack>
    </Window>
  );
};
