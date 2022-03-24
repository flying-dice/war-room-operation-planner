import { flow } from "lodash";
import { center, getCoord } from "@turf/turf";

/**
 * Traverses the Grid and finds the cell for the given x and y coords
 *
 * @param grid {FeatureCollection<Polygon>} Hex Grid for the Area
 * @param x {number} Grid X Coordinate
 * @param y {number} Grid Y Coordinate
 * @return {Feature<Polygon>} Grid Cell For Given Coordinatess
 */
export const getCell = (grid, { x, y }) =>
  grid.features.find(
    ({ properties }) => properties.x === x && properties.y === y
  );

/**
 * Traverses the Grid and finds the cell for the given x and y coords, gets the Cell Centre and
 * picks out the lngLat Position
 *
 * @param grid {FeatureCollection<Polygon>} Hex Grid for the Area
 * @param x {number} Grid X Coordinate
 * @param y {number} Grid Y Coordinate
 * @return {Position} Lng Lat Position for Centre of Cell
 */
export const getCellComPosition = (grid, { x, y }) =>
  flow([getCell, center, getCoord])(grid, { x, y });
