"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorToToaster = exports.displaySuccessToast = exports.displayWarningToast = exports.displayErrorToast = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _fp = require("lodash/fp");

var _errors = require("./errors");

var _api = require("../../utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Displays an error toast for the provided title and message
 *
 * @param errorTitle Title of error to display in toaster and modal
 * @param errorMessages Message to display in error modal when clicked
 * @param dispatchToaster provided by useStateToaster()
 */
var displayErrorToast = function displayErrorToast(errorTitle, errorMessages, dispatchToaster) {
  var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _uuid.default.v4();
  var toast = {
    id: id,
    title: errorTitle,
    color: 'danger',
    iconType: 'alert',
    errors: errorMessages
  };
  dispatchToaster({
    type: 'addToaster',
    toast: toast
  });
};
/**
 * Displays a warning toast for the provided title and message
 *
 * @param title warning message to display in toaster and modal
 * @param dispatchToaster provided by useStateToaster()
 * @param id unique ID if necessary
 */


exports.displayErrorToast = displayErrorToast;

var displayWarningToast = function displayWarningToast(title, dispatchToaster) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _uuid.default.v4();
  var toast = {
    id: id,
    title: title,
    color: 'warning',
    iconType: 'help'
  };
  dispatchToaster({
    type: 'addToaster',
    toast: toast
  });
};
/**
 * Displays a success toast for the provided title and message
 *
 * @param title success message to display in toaster and modal
 * @param dispatchToaster provided by useStateToaster()
 */


exports.displayWarningToast = displayWarningToast;

var displaySuccessToast = function displaySuccessToast(title, dispatchToaster) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _uuid.default.v4();
  var toast = {
    id: id,
    title: title,
    color: 'success',
    iconType: 'check'
  };
  dispatchToaster({
    type: 'addToaster',
    toast: toast
  });
};

exports.displaySuccessToast = displaySuccessToast;

/**
 * Displays an error toast with messages parsed from the error
 *
 * @param title error message to display in toaster and modal
 * @param error the error from which messages will be parsed
 * @param dispatchToaster provided by useStateToaster()
 */
var errorToToaster = function errorToToaster(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? _uuid.default.v4() : _ref$id,
      title = _ref.title,
      error = _ref.error,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'danger' : _ref$color,
      _ref$iconType = _ref.iconType,
      iconType = _ref$iconType === void 0 ? 'alert' : _ref$iconType,
      dispatchToaster = _ref.dispatchToaster;
  var toast;

  if ((0, _errors.isToasterError)(error)) {
    toast = {
      id: id,
      title: title,
      color: color,
      iconType: iconType,
      errors: error.messages
    };
  } else if ((0, _api.isApiError)(error)) {
    toast = {
      id: id,
      title: title,
      color: color,
      iconType: iconType,
      errors: [error.body.message]
    };
  } else if ((0, _fp.isError)(error)) {
    toast = {
      id: id,
      title: title,
      color: color,
      iconType: iconType,
      errors: [error.message]
    };
  } else {
    toast = {
      id: id,
      title: title,
      color: color,
      iconType: iconType,
      errors: ['Network Error']
    };
  }

  dispatchToaster({
    type: 'addToaster',
    toast: toast
  });
};

exports.errorToToaster = errorToToaster;