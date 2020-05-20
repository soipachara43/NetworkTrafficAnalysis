"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIPDetailsUrl = exports.getNetworkUrl = exports.RedirectToNetworkPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("../../pages/home/types");

var _types2 = require("../../graphql/types");

var _helpers = require("./helpers");

var _redirect_wrapper = require("./redirect_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToNetworkPage = function RedirectToNetworkPage(_ref) {
  var _ref$match$params = _ref.match.params,
      detailName = _ref$match$params.detailName,
      flowTarget = _ref$match$params.flowTarget,
      search = _ref.location.search;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: detailName ? "/".concat(_types.SiemPageName.network, "/ip/").concat(detailName, "/").concat(flowTarget).concat(search) : "/".concat(_types.SiemPageName.network).concat(search)
  });
};

exports.RedirectToNetworkPage = RedirectToNetworkPage;
var baseNetworkUrl = "#/link-to/".concat(_types.SiemPageName.network);

var getNetworkUrl = function getNetworkUrl(search) {
  return "".concat(baseNetworkUrl).concat((0, _helpers.appendSearch)(search));
};

exports.getNetworkUrl = getNetworkUrl;

var getIPDetailsUrl = function getIPDetailsUrl(detailName, flowTarget) {
  return "".concat(baseNetworkUrl, "/ip/").concat(detailName, "/").concat(flowTarget || _types2.FlowTarget.source);
};

exports.getIPDetailsUrl = getIPDetailsUrl;