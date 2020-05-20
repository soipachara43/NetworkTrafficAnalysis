"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Buttons = Buttons;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _useUrlParams = require("../../../../hooks/useUrlParams");

var _APMLink = require("../../../shared/Links/apm/APMLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @elastic/eui/href-or-on-click */
function Buttons(_ref) {
  var _ref$onFocusClick = _ref.onFocusClick,
      onFocusClick = _ref$onFocusClick === void 0 ? function () {} : _ref$onFocusClick,
      selectedNodeServiceName = _ref.selectedNodeServiceName;
  var urlParams = (0, _useUrlParams.useUrlParams)().urlParams;
  var detailsUrl = (0, _APMLink.getAPMHref)("/services/".concat(selectedNodeServiceName, "/transactions"), '', urlParams);
  var focusUrl = (0, _APMLink.getAPMHref)("/services/".concat(selectedNodeServiceName, "/service-map"), '', urlParams);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButton, {
    href: detailsUrl,
    fill: true
  }, _i18n.i18n.translate('xpack.apm.serviceMap.serviceDetailsButtonText', {
    defaultMessage: 'Service Details'
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButton, {
    color: "secondary",
    href: focusUrl,
    onClick: onFocusClick
  }, _i18n.i18n.translate('xpack.apm.serviceMap.focusMapButtonText', {
    defaultMessage: 'Focus map'
  }))));
}