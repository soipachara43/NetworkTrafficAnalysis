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
  help: _i18n.i18n.translate('xpack.canvas.functions.gteHelpText', {
    defaultMessage: 'Returns whether the {CONTEXT} is greater or equal to the argument.',
    values: {
      CONTEXT: _constants.CONTEXT
    }
  }),
  args: {
    value: _i18n.i18n.translate('xpack.canvas.functions.gte.args.valueHelpText', {
      defaultMessage: 'The value compared to the {CONTEXT}.',
      values: {
        CONTEXT: _constants.CONTEXT
      }
    })
  }
};
exports.help = help;