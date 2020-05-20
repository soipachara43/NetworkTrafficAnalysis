"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showApiWarning = showApiWarning;
exports.showApiError = showApiError;

var _kibana_services = require("../../kibana_services");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createToastConfig(error, errorTitle) {
  // Expect an error in the shape provided by http service.
  if (error && error.body) {
    var _error$body = error.body,
        errorString = _error$body.error,
        statusCode = _error$body.statusCode,
        message = _error$body.message;
    return {
      title: errorTitle,
      text: "".concat(statusCode, ": ").concat(errorString, ". ").concat(message)
    };
  }
}

function showApiWarning(error, errorTitle) {
  var toastConfig = createToastConfig(error, errorTitle);

  if (toastConfig) {
    return (0, _kibana_services.getNotifications)().toasts.addWarning(toastConfig);
  } // This error isn't an HTTP error, so let the fatal error screen tell the user something
  // unexpected happened.


  return (0, _kibana_services.getFatalErrors)().add(error, errorTitle);
}

function showApiError(error, errorTitle) {
  var toastConfig = createToastConfig(error, errorTitle);

  if (toastConfig) {
    return (0, _kibana_services.getNotifications)().toasts.addDanger(toastConfig);
  } // This error isn't an HTTP error, so let the fatal error screen tell the user something
  // unexpected happened.


  (0, _kibana_services.getFatalErrors)().add(error, errorTitle);
}