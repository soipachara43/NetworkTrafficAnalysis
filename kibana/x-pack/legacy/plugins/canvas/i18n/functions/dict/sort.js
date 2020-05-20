"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const help = {
  help: _i18n.i18n.translate('xpack.canvas.functions.sortHelpText', {
    defaultMessage: 'Sorts a datatable by the specified column.'
  }),
  args: {
    by: _i18n.i18n.translate('xpack.canvas.functions.sort.args.byHelpText', {
      defaultMessage: 'The column to sort by. When unspecified, the `{DATATABLE}` ' + 'is sorted by the first column.',
      values: {
        DATATABLE: _constants.DATATABLE
      }
    }),
    reverse: _i18n.i18n.translate('xpack.canvas.functions.sort.args.reverseHelpText', {
      defaultMessage: 'Reverses the sorting order. When unspecified, the `{DATATABLE}` ' + 'is sorted in ascending order.',
      values: {
        DATATABLE: _constants.DATATABLE
      }
    })
  }
};
exports.help = help;