"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelinesUrl = exports.RedirectToTimelinesPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("../../pages/home/types");

var _helpers = require("./helpers");

var _redirect_wrapper = require("./redirect_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToTimelinesPage = function RedirectToTimelinesPage(_ref) {
  var search = _ref.location.search;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(_types.SiemPageName.timelines).concat(search)
  });
};

exports.RedirectToTimelinesPage = RedirectToTimelinesPage;

var getTimelinesUrl = function getTimelinesUrl(search) {
  return "#/link-to/".concat(_types.SiemPageName.timelines).concat((0, _helpers.appendSearch)(search));
};

exports.getTimelinesUrl = getTimelinesUrl;