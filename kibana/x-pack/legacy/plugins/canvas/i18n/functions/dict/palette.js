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
  help: _i18n.i18n.translate('xpack.canvas.functions.paletteHelpText', {
    defaultMessage: 'Creates a color palette.'
  }),
  args: {
    color: _i18n.i18n.translate('xpack.canvas.functions.palette.args.colorHelpText', {
      defaultMessage: 'The palette colors. Accepts an {html} color name, {hex}, {hsl}, {hsla}, {rgb}, or {rgba}.',
      values: {
        html: 'HTML',
        rgb: 'RGB',
        rgba: 'RGBA',
        hex: 'HEX',
        hsl: 'HSL',
        hsla: 'HSLA'
      }
    }),
    gradient: _i18n.i18n.translate('xpack.canvas.functions.palette.args.gradientHelpText', {
      defaultMessage: 'Make a gradient palette where supported?'
    }),
    reverse: _i18n.i18n.translate('xpack.canvas.functions.palette.args.reverseHelpText', {
      defaultMessage: 'Reverse the palette?'
    })
  }
};
exports.help = help;