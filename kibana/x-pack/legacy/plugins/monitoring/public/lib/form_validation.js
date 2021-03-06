"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequiredFieldError = getRequiredFieldError;
exports.getMissingFieldErrors = getMissingFieldErrors;
exports.hasErrors = hasErrors;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getRequiredFieldError(field) {
  return _i18n.i18n.translate('xpack.monitoring.alerts.migrate.manageAction.requiredFieldError', {
    defaultMessage: '{field} is a required field.',
    values: {
      field: (0, _lodash.capitalize)(field)
    }
  });
}

function getMissingFieldErrors(data, defaultData) {
  var errors = {};

  for (var key in data) {
    if (!data.hasOwnProperty(key)) {
      continue;
    }

    if ((0, _lodash.isString)(defaultData[key])) {
      if (!data[key] || data[key].length === 0) {
        errors[key] = getRequiredFieldError(key);
      }
    } else if ((0, _lodash.isNumber)(defaultData[key])) {
      if (isNaN(data[key]) || data[key] === 0) {
        errors[key] = getRequiredFieldError(key);
      }
    }
  }

  return errors;
}

function hasErrors(errors) {
  for (var error in errors) {
    if (error.length) {
      return true;
    }
  }

  return false;
}