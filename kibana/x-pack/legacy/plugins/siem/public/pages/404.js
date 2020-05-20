"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _wrapper_page = require("../components/wrapper_page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NotFoundPage = _react.default.memo(function () {
  return _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.pages.fourohfour.noContentFoundDescription",
    defaultMessage: "No content found"
  }));
});

exports.NotFoundPage = NotFoundPage;
NotFoundPage.displayName = 'NotFoundPage';