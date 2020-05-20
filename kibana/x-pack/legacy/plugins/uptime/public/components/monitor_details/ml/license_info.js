"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowLicenseInfo = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _contexts = require("../../../contexts");

var labels = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ShowLicenseInfo = function ShowLicenseInfo() {
  var _useContext = (0, _react.useContext)(_contexts.UptimeSettingsContext),
      basePath = _useContext.basePath;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    className: "license-info-trial",
    title: labels.START_TRAIL,
    color: "primary",
    iconType: "help"
  }, _react.default.createElement("p", null, labels.START_TRAIL_DESC), _react.default.createElement(_eui.EuiButton, {
    color: "primary",
    href: basePath + "/app/kibana#/management/elasticsearch/license_management/home",
    target: "_blank"
  }, labels.START_TRAIL)), _react.default.createElement(_eui.EuiSpacer, null));
};

exports.ShowLicenseInfo = ShowLicenseInfo;