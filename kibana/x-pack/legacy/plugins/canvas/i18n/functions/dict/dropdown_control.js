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
  help: _i18n.i18n.translate('xpack.canvas.functions.dropdownControlHelpText', {
    defaultMessage: 'Configures a drop-down filter control element.'
  }),
  args: {
    filterColumn: _i18n.i18n.translate('xpack.canvas.functions.dropdownControl.args.filterColumnHelpText', {
      defaultMessage: 'The column or field that you want to filter.'
    }),
    valueColumn: _i18n.i18n.translate('xpack.canvas.functions.dropdownControl.args.valueColumnHelpText', {
      defaultMessage: 'The column or field from which to extract the unique values for the drop-down control.'
    }),
    filterGroup: _i18n.i18n.translate('xpack.canvas.functions.dropdownControl.args.filterGroupHelpText', {
      defaultMessage: 'The group name for the filter.'
    })
  }
};
exports.help = help;