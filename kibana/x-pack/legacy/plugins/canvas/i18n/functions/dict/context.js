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
  help: _i18n.i18n.translate('xpack.canvas.functions.contextHelpText', {
    defaultMessage: 'Returns whatever you pass into it. This can be useful when you need to use ' + '{CONTEXT} as argument to a function as a sub-expression.',
    values: {
      CONTEXT: _constants.CONTEXT
    }
  }),
  args: {}
};
exports.help = help;