import { useEffect, useState } from "react";
import { useMapbox } from "../@mapbox";
import { getDebugger } from "../debug";

const debug = getDebugger("useGeoJsonLayer");

/**
 *
 * @param data {GeoJSONSourceOptions["data"]}
 * @param layers: {AnyLayer[]}
 */
export const useGeoJsonLayers = (data, layers) => {
  const { map } = useMapbox();
  const [layer, setLayer] = useState();

  useEffect(() => {
    debug("Adding GeoJson Layer %o", data);
    const layer_ = map?.addGeoJsonLayers({ data }, layers);
    setLayer(layer_);

    return () => {
      debug("Removing GeoJson Layer");
      layer_?.remove();
      setLayer(undefined);
    };
  }, [map, data, layers]);

  return layer;
};
