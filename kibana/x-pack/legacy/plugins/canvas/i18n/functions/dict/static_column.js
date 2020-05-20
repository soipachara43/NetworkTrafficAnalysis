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
  help: _i18n.i18n.translate('xpack.canvas.functions.staticColumnHelpText', {
    defaultMessage: 'Add a column with the same static value in every row. See also {alterColumnFn} and {mapColumnFn}.',
    values: {
      alterColumnFn: '`alterColumn`',
      mapColumnFn: '`mapColumn`'
    }
  }),
  args: {
    name: _i18n.i18n.translate('xpack.canvas.functions.staticColumn.args.nameHelpText', {
      defaultMessage: 'The name of the new column column.'
    }),
    value: _i18n.i18n.translate('xpack.canvas.functions.staticColumn.args.valueHelpText', {
      defaultMessage: 'The value to insert in each row in the new column. Tip: use a sub-expression to rollup ' + 'other columns into a static value.'
    })
  }
};
exports.help = help;