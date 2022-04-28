import { keyBy } from "lodash";
import {
  groundUnits,
  installations,
  staticUnits,
  symbols,
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

const statuses = {
  present: "P",
  capable: "C",
  damaged: "D",
  destroyed: "X",
};

const echelons = {
  division: "I",
  brigade: "H",
};

const forGroundUnit = ({ type }, { affiliation, status, echelon }) => {
  const sid = ground[type]?.symbol;
  const s = symbolCodes[sid];

  return [
    s.scheme,
    affiliations[affiliation] || affiliations.unknown,
    s.dimension,
    statuses[status],
    s.function || symbolCodes.unit,
    s.modifier1,
    echelons[echelon],
  ].join("");
};

const forStaticUnit = ({ type }, { affiliation }) => {
  const sid = fixed[type]?.symbol;
  const s = symbolCodes[sid];

  return [
    s.scheme,
    affiliations[affiliation] || affiliations.unknown,
    s.dimension,
    statuses.present,
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
    statuses.present,
    s.function || symbolCodes.installation,
    s.modifier1,
    s.modifier2,
  ].join("");
};

export const SymbolCodes = { forGroundUnit, forInstallation, forStaticUnit };
