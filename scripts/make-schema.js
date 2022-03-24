const $RefParser = require("@apidevtools/json-schema-ref-parser");
const { dirname, resolve } = require("path");

const path = resolve(
  dirname(require.resolve("@flying-dice/war-room-models")),
  "../schema.json"
);
const schema = {
  $ref: `${path}#/definitions/OperationFile`,
};

$RefParser.dereference(schema, (err, schema) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(JSON.stringify(schema));
});
