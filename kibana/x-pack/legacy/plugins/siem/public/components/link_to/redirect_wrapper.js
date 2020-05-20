"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirectWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _scroll_to_top = require("../scroll_to_top");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectWrapper = function RedirectWrapper(_ref) {
  var to = _ref.to;
  (0, _scroll_to_top.useScrollToTop)();
  return _react.default.createElement(_reactRouterDom.Redirect, {
    to: to
  });
};

exports.RedirectWrapper = RedirectWrapper;