"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundPage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NotFoundPage = function NotFoundPage() {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "faceNeutral",
    iconColor: "subdued",
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "m"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Page not found",
      id: "xpack.uptime.emptyStateError.notFoundPage"
    }))),
    body: _react.default.createElement(_reactRouterDom.Link, {
      to: "/"
    }, _react.default.createElement(_eui.EuiButton, {
      href: "/"
    }, _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Back to home",
      id: "xpack.uptime.notFountPage.homeLinkText"
    })))
  }))));
};

exports.NotFoundPage = NotFoundPage;