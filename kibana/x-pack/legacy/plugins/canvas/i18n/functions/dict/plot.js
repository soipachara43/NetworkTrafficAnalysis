"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = void 0;

var _i18n = require("@kbn/i18n");

var _types = require("../../../types");

var _constants = require("../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const help = {
  help: _i18n.i18n.translate('xpack.canvas.functions.plotHelpText', {
    defaultMessage: 'Configure a chart element'
  }),
  args: {
    defaultStyle: _i18n.i18n.translate('xpack.canvas.functions.plot.args.defaultStyleHelpText', {
      defaultMessage: 'The default style to use for every series.'
    }),
    font: _i18n.i18n.translate('xpack.canvas.functions.plot.args.fontHelpText', {
      defaultMessage: 'The {CSS} font properties for the labels. For example, {FONT_FAMILY} or {FONT_WEIGHT}.',
      values: {
        CSS: _constants.CSS,
        FONT_FAMILY: _constants.FONT_FAMILY,
        FONT_WEIGHT: _constants.FONT_WEIGHT
      }
    }),
    legend: _i18n.i18n.translate('xpack.canvas.functions.plot.args.legendHelpText', {
      defaultMessage: 'The legend position. For example, {positions}, or {BOOLEAN_FALSE}. When {BOOLEAN_FALSE}, the legend is hidden.',
      values: {
        positions: Object.values(_types.Position).map(position => `\`"${position}"\``).join(', '),
        BOOLEAN_FALSE: _constants.BOOLEAN_FALSE
      }
    }),
    palette: _i18n.i18n.translate('xpack.canvas.functions.plot.args.paletteHelpText', {
      defaultMessage: 'A {palette} object for describing the colors to use in this chart. See {paletteFn}.',
      values: {
        palette: '`palette`',
        paletteFn: '`palette`'
      }
    }),
    seriesStyle: _i18n.i18n.translate('xpack.canvas.functions.plot.args.seriesStyleHelpText', {
      defaultMessage: 'A style of a specific series'
    }),
    xaxis: _i18n.i18n.translate('xpack.canvas.functions.plot.args.xaxisHelpText', {
      defaultMessage: 'The axis configuration. When {BOOLEAN_FALSE}, the axis is hidden.',
      values: {
        BOOLEAN_FALSE: _constants.BOOLEAN_FALSE
      }
    }),
    yaxis: _i18n.i18n.translate('xpack.canvas.functions.plot.args.yaxisHelpText', {
      defaultMessage: 'The axis configuration. When {BOOLEAN_FALSE}, the axis is hidden.',
      values: {
        BOOLEAN_FALSE: _constants.BOOLEAN_FALSE
      }
    })
  }
};
exports.help = help;