import { useEffect, useMemo } from "react";
import { useMapbox } from "../@mapbox";
import { getDebugger } from "../debug";

const debug = getDebugger("useMilSymbol");

/**
 *
 * @param symbol {Symbol}
 * @param lngLat {Position}
 * @param onClick {() => void}
 */
export const useMilSymbol = (symbol, lngLat, onClick) => {
  const { map } = useMapbox();
  const htmlElement = useMemo(() => symbol.asCanvas(), [symbol]);

  useEffect(() => {
    debug("Adding MilSymbol Marker %o %o", symbol, lngLat);
    htmlElement.addEventListener("click", onClick);
    const marker = lngLat && map?.addMarker(htmlElement, lngLat);

    return () => {
      debug("Removing MilSymbol Marker");
      marker?.remove();
      htmlElement.removeEventListener("click", onClick);
    };
  }, [map, htmlElement, lngLat]);
};
