import { useMemo } from "react";

const shortid = require("shortid");

/**
 * Alternative to createRef where an ID is required as the Component referenced does not expose
 * a ref prop
 *
 * @see {@link https://github.com/microsoft/fluentui/issues/20410}
 *
 * Returns a tuple of [id, css-selector] // [422dedcc, #422dedcc]
 *
 * @example
 *   const [dragHandleId, dragHandleSelector] = useCreateId();
 *   return <Stack id={dragHandleId} .../>
 *
 * @return {[string,string]}
 */
export const useCreateId = () => {
  const id = useMemo(() => shortid.generate(), []);

  return [id, `#${id}`];
};
