import { MapboxContext } from "./MapboxContext";
import { createRef, useEffect, useState } from "react";
import { Map } from "mapbox-gl";
import { config } from "./config";
import Draw from "@mapbox/mapbox-gl-draw";

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
    const myMap = new Map({
      container: ref.current,
      ...config,
    });

    myMap.on("load", () => {
      debug("Mapbox Instantiated, updating state");
      const myDraw = new Draw({
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

  const handleToggleStyle = () => {
    debug("Changing Map Style");
    if (map) {
      const newStyle =
        activeStyle === config.style ? config.satelliteStyle : config.style;
      map.setStyle(newStyle);
      map.on("style.load", () => {
        debug("Style Finished Loading, setting new active style");
        setActiveStyle(newStyle);
      });
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
