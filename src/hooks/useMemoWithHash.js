import { useMemo } from "react";
import objectHash from "object-hash";

/**
 * Wraps useMemo with hashing to only refresh the result if the hash is different
 *
 * @param obj
 * @return {*}
 */
export const useMemoWithHash = (obj) => {
  const objHash = useMemo(() => objectHash(obj), [obj]);
  return useMemo(() => obj, [objHash]);
};
