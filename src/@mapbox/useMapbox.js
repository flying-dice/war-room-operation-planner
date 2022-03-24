import { useContext } from "react";
import { MapboxContext } from "./MapboxContext";

export const useMapbox = () => useContext(MapboxContext);
