"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errors = exports.help = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const help = {
  help: _i18n.i18n.translate('xpack.canvas.functions.joinRowsHelpText', {
    defaultMessage: 'Join values from rows in a datatable into a string'
  }),
  args: {
    column: _i18n.i18n.translate('xpack.canvas.functions.joinRows.args.columnHelpText', {
      defaultMessage: 'The column to join values from'
    }),
    separator: _i18n.i18n.translate('xpack.canvas.functions.joinRows.args.separatorHelpText', {
      defaultMessage: 'The separator to use between row values'
    }),
    quote: _i18n.i18n.translate('xpack.canvas.functions.joinRows.args.quoteHelpText', {
      defaultMessage: 'The quote character around values'
    }),
    distinct: _i18n.i18n.translate('xpack.canvas.functions.joinRows.args.distinctHelpText', {
      defaultMessage: 'Removes duplicate values?'
    })
  }
};
exports.help = help;
const errors = {
  columnNotFound: column => new Error(_i18n.i18n.translate('xpack.canvas.functions.joinRows.columnNotFoundErrorMessage', {
    defaultMessage: "Column not found: '{column}'",
    values: {
      column
    }
  }))
};
exports.errors = errors;