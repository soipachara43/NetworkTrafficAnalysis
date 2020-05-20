"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatUptimeGraphQLErrorList = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var formatUptimeGraphQLErrorList = function formatUptimeGraphQLErrorList(errors) {
  return errors.reduce(function (errorString, error) {
    return errorString.concat("".concat(_i18n.i18n.translate('xpack.uptime.errorMessage', {
      values: {
        message: error.message
      },
      defaultMessage: 'Error: {message}'
    }), "\n"));
  }, '');
};

exports.formatUptimeGraphQLErrorList = formatUptimeGraphQLErrorList;