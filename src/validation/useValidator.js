import Ajv from "ajv";
import schema from "./operation.schema.json";
import { useState } from "react";
import isUUID from "validator/es/lib/isUUID";
import isISO8601 from "validator/es/lib/isISO8601";
import isISO31661Alpha2 from "validator/es/lib/isISO31661Alpha2";

const debug = require("debug")("flying-dice:war-room-operation-editor:useValidator");

const ajv = new Ajv({ allowUnionTypes: true });
ajv.addFormat("uuid", {
  type: "string",
  validate: isUUID,
});
ajv.addFormat("iso-8601", {
  type: "string",
  validate: isISO8601,
});
ajv.addFormat("iso-31661-alpha-2", {
  type: "string",
  validate: (it) => isISO31661Alpha2(it.split("-")[0]),
});
ajv.addFormat("lat", {
  type: "number",
  validate: (it) => it >= -90 && it <= 90,
});
ajv.addFormat("lng", {
  type: "number",
  validate: (it) => it >= -180 && it <= 180,
});
const validate = ajv.compile(schema);

export const useValidator = () => {
  const [error, setError] = useState("");

  const validateOperation = (operation) => {
    debug("Validating Operation");
    if (!validate(operation)) {
      debug("Operation Failed Validation")
      const err = JSON.stringify(validate.errors, undefined, 2);
      setError(err);
      throw new Error(err);
    }
    setError(undefined);
  };
  return { validateOperation, error };
};
