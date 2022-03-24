import { Icon, Stack, Text, useTheme } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useMapbox } from "../@mapbox";
import sexagesimal from "@mapbox/sexagesimal";

export const InfoBar = ({ className, hoveredCell }) => {
  const { spacing, palette } = useTheme();
  const { map } = useMapbox();
  const [lngLat, setLngLat] = useState();

  useEffect(() => {
    map?.on("mousemove", (ev) => {
      setLngLat(ev.lngLat);
    });
  }, [map]);

  return (
    <Stack
      className={className}
      horizontal
      verticalAlign="center"
      horizontalAlign="space-between"
      styles={{
        root: {
          backgroundColor: palette.neutralLighterAlt,
          paddingLeft: spacing.m,
          paddingRight: spacing.m,
        },
      }}
      tokens={{ childrenGap: spacing.s1 }}
    >
      <Stack
        horizontal
        verticalAlign={"center"}
        tokens={{ childrenGap: spacing.s1 }}
      >
        <Text>
          Lat: {lngLat?.lat.toFixed(5)} Lon: {lngLat?.lng.toFixed(5)}
        </Text>
        <Icon iconName="Globe" />
        <Text>
          {lngLat &&
            sexagesimal.formatPair({ lat: lngLat.lat, lon: lngLat.lng })}
        </Text>
      </Stack>
      <Stack>
        <Text>
          {hoveredCell &&
            `${hoveredCell?.properties.id} : ${hoveredCell?.properties.x},${hoveredCell?.properties.y}`}
        </Text>
      </Stack>
    </Stack>
  );
};
