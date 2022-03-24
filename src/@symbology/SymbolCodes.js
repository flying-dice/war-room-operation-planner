import { keyBy } from "lodash";
import * as wrd from "@flying-dice/war-room-data";

const symbolCodes = keyBy(wrd.symbols, "id");
const groundUnits = keyBy(wrd.groundUnits, "id");
const staticUnits = keyBy(wrd.staticUnits, "id");
const installations = keyBy(wrd.installations, "id");

const scheme = {
  warfighting: "S",
};

const affiliations = {
  friend: "F",
  neutral: "N",
  hostile: "H",
  unknown: "U",
};

const dimension = {
  groundUnit: "G",
  groundInstallation: "G",
};

const status = {
  present: "P",
};

const modifier1 = {
  na: "-",
  installation: "H",
};

const modifier2 = {
  na: "-",
  brigade: "H",
  battery: "E",
};

const forGroundUnit = ({ type }, { affiliation }) =>
  [
    scheme.warfighting,
    affiliations[affiliation] || affiliations.unknown,
    dimension.groundUnit,
    status.present,
    symbolCodes[groundUnits[type]?.symbol]?.code || symbolCodes.unit,
    modifier1.na,
    modifier2.brigade,
  ].join("");

const forStaticUnit = ({ type }, { affiliation }) =>
  [
    scheme.warfighting,
    affiliations[affiliation] || affiliations.unknown,
    dimension.groundUnit,
    status.present,
    symbolCodes[staticUnits[type]?.symbol]?.code || symbolCodes.unit,
    modifier1.na,
    modifier2.battery,
  ].join("");

const forInstallation = ({ type }, { affiliation }) =>
  [
    scheme.warfighting,
    affiliations[affiliation] || affiliations.unknown,
    dimension.groundInstallation,
    status.present,
    symbolCodes[installations[type]?.symbol]?.code || symbolCodes.unit,
    modifier1.installation,
    modifier2.na,
  ].join("");

export const SymbolCodes = { forGroundUnit, forInstallation, forStaticUnit };
