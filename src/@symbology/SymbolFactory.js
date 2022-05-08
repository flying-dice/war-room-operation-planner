import { Symbol } from "milsymbol";
import { SymbolCodes } from "./SymbolCodes";
import { getStatus } from "../utils/get-status";
import { getDebugger } from "../debug";

const debug = getDebugger("SymbolFactory");

const getSymbol = (
  code,
  size = 30,
  uniqueDesignation = undefined,
  parent = undefined
) => {
  const args = [
    code,
    {
      size,
      uniqueDesignation: uniqueDesignation,
      higherFormation: parent,
      strokeWidth: 3,
    },
  ];
  debug("Creating new Symbol with args %o", args);
  return new Symbol(...args);
};

export const SymbolFactory = {
  forInstallation: (installation, { affiliation }) =>
    getSymbol(
      SymbolCodes.forInstallation(installation, {
        affiliation: affiliation,
      })
    ),
  forGroundUnit: (unit, parent, { affiliation }) =>
    getSymbol(
      SymbolCodes.forGroundUnit(unit, {
        affiliation: affiliation,
        status: getStatus(unit.health),
        echelon: unit.echelon,
      }),
      32,
      unit.uniqueDesignation,
      parent?.uniqueDesignation
    ),
  forStaticUnit: (unit, { affiliation }) =>
    getSymbol(SymbolCodes.forStaticUnit(unit, { affiliation })),
};
