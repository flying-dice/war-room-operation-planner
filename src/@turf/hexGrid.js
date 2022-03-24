import shortId from "shortid";
import {
  area,
  bbox,
  center,
  hexGrid as tjsHexGrid,
  intersect,
} from "@turf/turf";
import { featureId } from "../@mapbox";

/**
 * Gets the Cell at the top left of the grid by comparing the center of the cell to other cells
 * and determining the most North Western Cell.
 *
 * @param grid {FeatureCollection}
 * @return {Feature}
 */
const getTopLeftCell = (grid) => {
  let topLeftCell;

  grid.features.forEach((feature) => {
    if (!topLeftCell) {
      topLeftCell = feature;
    }

    const [tlCellX, tlCellY] = center(topLeftCell).geometry.coordinates;
    const [cellX, cellY] = center(feature).geometry.coordinates;

    if (cellX <= tlCellX && cellY >= tlCellY) {
      topLeftCell = feature;
    }
  });

  return topLeftCell;
};

/**
 * Loops over all grid cells and associates an ID in the form {index}#{short-id}
 *
 * @param grid {FeatureCollection}
 */
const generateGridIds = (grid) => {
  grid.features.forEach((feature, idx) => {
    feature.id = featureId();
    feature.properties.id = shortId.generate();
    feature.properties.featureId = feature.id;
    feature.properties.gridIndex = idx;
  });

  return grid;
};

/**
 * Calculates the Distance that represents 1 tile away, i.e. if tiles have a radius of 1km, and
 * the y distance is requested it would return 2 km.
 *
 * Using this its then possible to calculate how offset a cell is from another in order to
 * determine its X or Y Position relative to another cell.
 *
 * @param grid {FeatureCollection}
 * @param xOrY {0 | 1} 0 = x, 1 = y
 */
const getDistanceComparator = (grid, xOrY) => {
  const origin = center(grid.features[0]);

  const firstCellOffsetFromOrigin = center(
    grid.features.find(
      (it) =>
        center(it).geometry.coordinates[xOrY] !==
        origin.geometry.coordinates[xOrY]
    )
  );
  return (
    firstCellOffsetFromOrigin.geometry.coordinates[xOrY] -
    origin.geometry.coordinates[xOrY]
  );
};

/**
 * Generates a new Hex Grid over a feature
 *
 * @param feature {Feature<Polygon>}
 * @param cellSide {number}
 * @param intersectThreshold {number} % of the cell area that must be within the Feature to keep as a cell
 * @return {FeatureCollection<Polygon, Properties>}
 */
export const hexGrid = (feature, cellSide = 10, intersectThreshold = 0.1) => {
  const grid = generateGridIds(tjsHexGrid(bbox(feature), cellSide));

  const cellArea = area(grid.features[0]);

  const topLeft = getTopLeftCell(grid);
  const origin = center(topLeft);

  const xUnit = getDistanceComparator(grid, 0);
  const yUnit = getDistanceComparator(grid, 1);

  grid.features.forEach((feature) => {
    const myCenter = center(feature);
    const x = Number(
      (
        Math.abs(
          myCenter.geometry.coordinates[0] - origin.geometry.coordinates[0]
        ) / xUnit
      ).toFixed(2)
    );

    let y = Number(
      (
        Math.abs(
          myCenter.geometry.coordinates[1] - origin.geometry.coordinates[1]
        ) / yUnit
      ).toFixed(2)
    );

    y = y - (y % 1);

    feature.properties.x = x;
    feature.properties.y = y;
  });

  grid.features = grid.features.filter((it) => {
    const intersection = intersect(feature, it);
    if (!intersection) return false;

    const intersectionPercentage = Number(
      (area(intersection) / cellArea).toFixed(4)
    );
    return intersectionPercentage >= intersectThreshold;
  });

  return grid;
};
