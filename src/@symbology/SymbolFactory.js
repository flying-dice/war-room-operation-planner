import { Symbol } from "milsymbol";
import { SymbolCodes } from "./SymbolCodes";

const getSymbol = (code, size = 30) =>
  new Symbol(code, { size, strokeWidth: 2 });

export const SymbolFactory = {
  forInstallation: (installation, affiliation) =>
    getSymbol(SymbolCodes.forInstallation(installation, { affiliation })),
  forGroundUnit: (unit, affiliation) =>
    getSymbol(SymbolCodes.forGroundUnit(unit, { affiliation }), 44),
  forStaticUnit: (unit, affiliation) =>
    getSymbol(SymbolCodes.forStaticUnit(unit, { affiliation })),
};
