export const Layers = {
  /**
   * Association between Division and Brigade
   *
   * @param color {string}
   * @returns {LineLayer}
   */
  getDivisionBrigadeLink: ({ color }) => ({
    type: "line",
    paint: {
      "line-opacity": 0.5,
      "line-color": color,
      "line-dasharray": [4, 4],
      "line-width": 2,
    },
  }),

  /**
   * Brigade Fill Layer
   *
   * @param color {string}
   * @returns {FillLayer}
   */
  getBrigadeFill: ({ color }) => ({
    type: "fill",
    paint: {
      "fill-opacity": 0.05,
      "fill-color": color,
    },
  }),

  /**
   * Division Fill Layer
   *
   * @param color {string}
   * @returns {FillLayer}
   */
  getDivisionFill: ({ color }) => ({
    type: "fill",
    paint: {
      "fill-opacity": 0.1,
      "fill-color": color,
    },
  }),

  /**
   * Division Influence Fill Layer
   * @param color {string}
   * @returns {FillLayer}
   */
  getDivisionInfluenceFill: ({ color }) => ({
    type: "fill",
    paint: {
      "fill-opacity": 0.03,
      "fill-color": color,
    },
  }),

  /**
   * Phase Line & Label Layer
   * @param label {string}
   * @returns {[LineLayer, SymbolLayer]}
   */
  getPhaseLineLayers: ({ label }) => [
    {
      type: "line",
      paint: {
        "line-opacity": 0.5,
        "line-width": 2,
      },
    },
    {
      type: "symbol",
      layout: {
        "symbol-placement": "line",
        "text-field": label,
        "text-size": 24,
        "text-anchor": "bottom",
      },
    },
  ],

  /**
   * Grid Fill and Line Layers
   *
   * @returns {[FillLayer, LineLayer]}
   */
  getGridFillLayers: () => [
    {
      type: "fill",
      paint: {
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.1,
          0,
        ],
      },
    },
    {
      type: "line",
      paint: {
        "line-opacity": 0.1,
        "line-width": 2,
      },
    },
  ],

  /**
   * Background Layers for Earth Area outside the AO
   *
   * @returns {[FillLayer]}
   */
  getBackgroundLayers: () => [{ type: "fill", paint: { "fill-opacity": 0.2 } }],
};
