import { useMemo } from "react";

export const useAffiliation = (coalitions, country) => {
  return useMemo(() => {
    if (coalitions.blufor.includes(country)) return "friend";
    if (coalitions.opfor.includes(country)) return "hostile";
    return "unknown";
  }, [coalitions, country]);
};
