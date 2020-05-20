"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorPageLink = void 0;

var _eui = require("@elastic/eui");

var _reactRouterDom = require("react-router-dom");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MonitorPageLink = function MonitorPageLink(_ref) {
  var children = _ref.children,
      monitorId = _ref.monitorId,
      linkParameters = _ref.linkParameters;

  var getLocationTo = function getLocationTo() {
    // encode monitorId param as 64 base string to make it a valid URL, since it can be a url
    return linkParameters ? "/monitor/".concat(btoa(monitorId), "/").concat(linkParameters) : "/monitor/".concat(btoa(monitorId));
  };

  return _react.default.createElement(_eui.EuiLink, null, _react.default.createElement(_reactRouterDom.Link, {
    "data-test-subj": "monitor-page-link-".concat(monitorId),
    to: getLocationTo()
  }, children));
};

exports.MonitorPageLink = MonitorPageLink;