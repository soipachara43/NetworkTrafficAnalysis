"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicenseProvider = LicenseProvider;
exports.LicenseContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactUse = require("react-use");

var _useApmPluginContext = require("../../hooks/useApmPluginContext");

var _InvalidLicenseNotification = require("./InvalidLicenseNotification");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LicenseContext = _react.default.createContext(undefined);

exports.LicenseContext = LicenseContext;

function LicenseProvider(_ref) {
  var children = _ref.children;
  var license$ = (0, _useApmPluginContext.useApmPluginContext)().plugins.licensing.license$;
  var license = (0, _reactUse.useObservable)(license$); // if license is not loaded yet, consider it valid

  var hasInvalidLicense = (license === null || license === void 0 ? void 0 : license.isActive) === false; // if license is invalid show an error message

  if (hasInvalidLicense) {
    return _react.default.createElement(_InvalidLicenseNotification.InvalidLicenseNotification, null);
  } // render rest of application and pass down license via context


  return _react.default.createElement(LicenseContext.Provider, {
    value: license,
    children: children
  });
}