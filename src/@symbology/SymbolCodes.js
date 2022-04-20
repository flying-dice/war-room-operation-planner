import { keyBy } from "lodash";
import {
  symbols,
  installations,
  staticUnits,
  groundUnits,
} from "@flying-dice/war-room-data";

const symbolCodes = keyBy(symbols, "id");
const ground = keyBy(groundUnits, "id");
const fixed = keyBy(staticUnits, "id");
const inst = keyBy(installations, "id");

const affiliations = {
  friend: "F",
  neutral: "N",
  hostile: "H",
  unknown: "U",
};

const status = {
  present: "P",
};

const forGroundUnit = ({ type }, { affiliation }) => {
  const sid = ground[type]?.symbol;
  const s = symbolCodes[sid];

  return [
    s.scheme,
    affiliations[affiliation] || affiliations.unknown,
    s.dimension,
    status.present,
    s.function || symbolCodes.unit,
    s.modifier1,
    s.modifier2,
  ].join("");
};

const forStaticUnit = ({ type }, { affiliation }) => {
  const sid = fixed[type]?.symbol;
  const s = symbolCodes[sid];

  return [
    s.scheme,
    affiliations[affiliation] || affiliations.unknown,
    s.dimension,
    status.present,
    s.function || symbolCodes.unit,
    s.modifier1,
    s.modifier2,
  ].join("");
};

const forInstallation = ({ type }, { affiliation }) => {
    const sid = inst[type]?.symbol;
    const s = symbolCodes[sid];

    return [
        s.scheme,
        affiliations[affiliation] || affiliations.unknown,
        s.dimension,
        status.present,
        s.function || symbolCodes.installation,
        s.modifier1,
        s.modifier2,
    ].join("");
}

export const SymbolCodes = { forGroundUnit, forInstallation, forStaticUnit };
