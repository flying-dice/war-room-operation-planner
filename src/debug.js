export const getDebugger = (namespace) =>
  require("debug")(`flying-dice:war-room-operation-editor:${namespace}`);
