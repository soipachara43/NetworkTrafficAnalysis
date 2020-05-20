"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const help = {
  help: _i18n.i18n.translate('xpack.canvas.functions.savedVisualizationHelpText', {
    defaultMessage: `Returns an embeddable for a saved visualization object`
  }),
  args: {
    id: _i18n.i18n.translate('xpack.canvas.functions.savedVisualization.args.idHelpText', {
      defaultMessage: `The ID of the Saved Visualization Object`
    }),
    timerange: _i18n.i18n.translate('xpack.canvas.functions.savedVisualization.args.timerangeHelpText', {
      defaultMessage: `The timerange of data that should be included`
    }),
    colors: _i18n.i18n.translate('xpack.canvas.functions.savedVisualization.args.colorsHelpText', {
      defaultMessage: `Define the color to use for a specific series`
    }),
    hideLegend: _i18n.i18n.translate('xpack.canvas.functions.savedVisualization.args.hideLegendHelpText', {
      defaultMessage: `Should the legend be hidden`
    })
  }
};
exports.help = help;