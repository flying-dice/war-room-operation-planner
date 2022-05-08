import { useOperation } from "../context/operation/useOperation";
import { useMemo } from "react";
import { getDebugger } from "../debug";

const debug = getDebugger("useAffiliation");

/**
 * Determines the Affiliation of the given country based off the operations situation
 *
 * @param country {string} Country to determine affiliation of
 * @returns {"FRIEND" | "NEUTRAL" | "HOSTILE" | "UNKNOWN"} Affiliation as FRIEND, NEUTRAL, HOSTILE or UNKNOWN
 */
export const useAffiliation = (country) => {
  const { operation } = useOperation();

  return useMemo(() => {
    if (operation.opord.situation.blufor.countries.includes(country)) {
      debug("Calculated Affiliation as 'FRIEND' for %s", country);
      return "FRIEND";
    }

    if (operation.opord.situation.opfor.countries.includes(country)) {
      debug("Calculated Affiliation as 'HOSTILE' for %s", country);
      return "HOSTILE";
    }

    debug("Calculated Affiliation as 'UNKNOWN' for %s", country);
    return "UNKNOWN";
  }, [operation.opord.situation.blufor.countries, operation.opord.situation.opfor.countries, country]);
};
