"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errors = exports.help = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const help = {
  help: _i18n.i18n.translate('xpack.canvas.functions.mathHelpText', {
    defaultMessage: 'Interprets a {TINYMATH} math expression using a number or {DATATABLE} as {CONTEXT}. ' + 'The {DATATABLE} columns are available by their column name. ' + 'If the {CONTEXT} is a number it is available as {value}.',
    values: {
      TINYMATH: _constants.TINYMATH,
      CONTEXT: _constants.CONTEXT,
      DATATABLE: _constants.DATATABLE,
      value: '`value`'
    }
  }),
  args: {
    expression: _i18n.i18n.translate('xpack.canvas.functions.math.args.expressionHelpText', {
      defaultMessage: 'An evaluated {TINYMATH} expression. See {TINYMATH_URL}.',
      values: {
        TINYMATH: _constants.TINYMATH,
        TINYMATH_URL: _constants.TINYMATH_URL
      }
    })
  }
};
exports.help = help;
const errors = {
  emptyExpression: () => new Error(_i18n.i18n.translate('xpack.canvas.functions.math.emptyExpressionErrorMessage', {
    defaultMessage: 'Empty expression'
  })),
  tooManyResults: () => new Error(_i18n.i18n.translate('xpack.canvas.functions.math.tooManyResultsErrorMessage', {
    defaultMessage: 'Expressions must return a single number. Try wrapping your expression in {mean} or {sum}',
    values: {
      mean: 'mean()',
      sum: 'sum()'
    }
  })),
  executionFailed: () => new Error(_i18n.i18n.translate('xpack.canvas.functions.math.executionFailedErrorMessage', {
    defaultMessage: 'Failed to execute math expression. Check your column names'
  })),
  emptyDatatable: () => new Error(_i18n.i18n.translate('xpack.canvas.functions.math.emptyDatatableErrorMessage', {
    defaultMessage: 'Empty datatable'
  }))
};
exports.errors = errors;