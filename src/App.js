import React, { useState } from "react";
import { Stack } from "@fluentui/react";
import styles from "./App.module.css";
import { CodeEditor } from "./editor/CodeEditor";
import { AppBar } from "./bar/AppBar";
import { exampleOperation } from "./example";
import { DrawCommandBar, Map } from "./@mapbox";
import { useGrid } from "./hooks/useGrid";
import { Installation } from "./entity-renderers/Installation";
import { GroundUnit } from "./entity-renderers/GroundUnit";
import { StaticUnit } from "./entity-renderers/StaticUnit";
import { InfoBar } from "./bar/InfoBar";

const App = () => {
  const [operation, setOperation] = useState(exampleOperation);
  const { grid, hoveredCell } = useGrid(operation);

  return (
    <Stack className={styles.appContainer}>
      <AppBar className={styles.appBar} />
      <CodeEditor operation={operation} onChange={setOperation} />
      <Stack>
        <DrawCommandBar />
        <Map />
        {operation.installations.map((it) => (
          <Installation
            key={it.id}
            installation={it}
            coalitions={operation.coalitions}
          />
        ))}
        {operation.groundUnits.map((it) => (
          <GroundUnit
            key={it.id}
            unit={it}
            grid={grid}
            coalitions={operation.coalitions}
          />
        ))}
        {operation.staticUnits.map((it) => (
          <StaticUnit key={it.id} unit={it} coalitions={operation.coalitions} />
        ))}
      </Stack>
      <InfoBar className={styles.infoBar} hoveredCell={hoveredCell} />
    </Stack>
  );
};

export default App;
