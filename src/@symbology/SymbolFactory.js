import { Symbol } from "milsymbol";
import { SymbolCodes } from "./SymbolCodes";
import { coalitionAffiliation } from "../utils/coalition-affiliation";
import { getStatus } from "../utils/get-status";

const getSymbol = (
  code,
  size = 30,
  designation = undefined,
  parent = undefined
) =>
  new Symbol(code, {
    size,
    uniqueDesignation: designation,
    higherFormation: parent,
    strokeWidth: 3,
  });

export const SymbolFactory = {
  forInstallation: (installation) =>
    getSymbol(
      SymbolCodes.forInstallation(installation, {
        affiliation: coalitionAffiliation["BLUFOR"],
      })
    ),
  forGroundUnit: (unit, parent) =>
    getSymbol(
      SymbolCodes.forGroundUnit(unit, {
        affiliation: coalitionAffiliation[unit.coalition],
        status: getStatus(unit.health),
        echelon: unit.echelon,
      }),
      32,
      unit.designation,
      parent?.designation
    ),
  forStaticUnit: (unit) =>
    getSymbol(
      SymbolCodes.forStaticUnit(unit, {
        affiliation: coalitionAffiliation[unit.coalition],
      })
    ),
};
