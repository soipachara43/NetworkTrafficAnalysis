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
  help: _i18n.i18n.translate('xpack.canvas.functions.savedLensHelpText', {
    defaultMessage: `Returns an embeddable for a saved lens object`
  }),
  args: {
    id: _i18n.i18n.translate('xpack.canvas.functions.savedLens.args.idHelpText', {
      defaultMessage: `The ID of the Saved Lens Object`
    }),
    timerange: _i18n.i18n.translate('xpack.canvas.functions.savedLens.args.timerangeHelpText', {
      defaultMessage: `The timerange of data that should be included`
    }),
    title: _i18n.i18n.translate('xpack.canvas.functions.savedLens.args.titleHelpText', {
      defaultMessage: `The title for the lens emebeddable`
    })
  }
};
exports.help = help;