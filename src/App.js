import React, { useEffect, useState } from "react";
import { Stack } from "@fluentui/react";
import styles from "./App.module.css";
import { CodeEditor } from "./editor/CodeEditor";
import { AppBar } from "./bar/AppBar";
import { exampleOperation } from "./example";
import { DrawCommandBar, Map, useMapbox } from "./@mapbox";
import { useGrid } from "./hooks/useGrid";
import { Division } from "./entity-renderers/Division";
import { InfoBar } from "./bar/InfoBar";
import { OpordWindow } from "./opord/OpordWindow";
import { PhaseLine } from "./entity-renderers/PhaseLine";
import { center } from "@turf/turf";

const App = () => {
  const [operation, setOperation] = useState(exampleOperation);
  const [openOpord, setOpenOpord] = useState(false);
  const { grid, hoveredCell } = useGrid(operation.area);
  const { map } = useMapbox();

  useEffect(() => {
    if (map && operation.area) {
      map.jumpTo({ center: center(operation.area).geometry.coordinates });
    }
  }, [map, operation]);
  return (
    <>
      <Stack className={styles.appContainer}>
        <AppBar className={styles.appBar} />
        <CodeEditor operation={operation} onChange={setOperation} />
        <Stack>
          <DrawCommandBar onOpenOpord={() => setOpenOpord(true)} />
          <Map />
          {grid &&
            operation.divisions.map((it) => (
              <Division
                key={it.id}
                division={it}
                corps={{ designation: "III" }}
                grid={grid}
              />
            ))}
          {operation.phaseLines.map((it) => (
            <PhaseLine key={it.id} phaseLine={it} />
          ))}
        </Stack>
        <InfoBar className={styles.infoBar} hoveredCell={hoveredCell} />
      </Stack>
      <OpordWindow
        isOpen={openOpord}
        onDismiss={() => setOpenOpord(false)}
        operation={operation}
      />
    </>
  );
};

export default App;
