"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOverviewUrl = exports.RedirectToOverviewPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _redirect_wrapper = require("./redirect_wrapper");

var _types = require("../../pages/home/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToOverviewPage = function RedirectToOverviewPage(_ref) {
  var search = _ref.location.search;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(_types.SiemPageName.overview).concat(search)
  });
};

exports.RedirectToOverviewPage = RedirectToOverviewPage;

var getOverviewUrl = function getOverviewUrl() {
  return "#/link-to/".concat(_types.SiemPageName.overview);
};

exports.getOverviewUrl = getOverviewUrl;