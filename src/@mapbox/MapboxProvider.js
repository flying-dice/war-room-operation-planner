import { createRef, useEffect, useState } from "react";
import { MapboxDraw, MapboxMap } from "@flying-dice/mapbox-toolkit";
import { MapboxContext } from "./MapboxContext";
import { config } from "./config";

const debug = require("debug")("mapbox:provider");

export const MapboxProvider = ({ children }) => {
  const ref = createRef();
  const [activeStyle, setActiveStyle] = useState(config.style);
  const [map, setMap] = useState();
  const [draw, setDraw] = useState();

  useEffect(() => {
    if (!ref.current) {
      debug(
        "Cannot Instantiate Mapbox Map, ensure 'Map' is inside the MapboxProvider"
      );
      return;
    }
    debug("Instantiating Mapbox");
    const myMap = new MapboxMap({
      container: ref.current,
      ...config,
    });

    myMap.on("load", () => {
      debug("Mapbox Instantiated, updating state");
      const myDraw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          point: false,
          line_string: false,
          polygon: false,
          trash: false,
          combine_features: false,
          uncombine_features: false,
        },
      });
      myMap.addControl(myDraw, "top-left");
      setMap(myMap);
      setDraw(myDraw);
    });
  }, []);

  const handleToggleStyle = async () => {
    debug("Changing Map Style");
    if (map) {
      const newStyle =
        activeStyle === config.style ? config.satelliteStyle : config.style;
      await map.setStyle(newStyle);
      setActiveStyle(newStyle);
    }
  };

  return (
    <MapboxContext.Provider
      value={{
        map,
        draw,
        ref,
        activeStyle,
        toggleStyle: handleToggleStyle,
      }}
    >
      {children}
    </MapboxContext.Provider>
  );
};
