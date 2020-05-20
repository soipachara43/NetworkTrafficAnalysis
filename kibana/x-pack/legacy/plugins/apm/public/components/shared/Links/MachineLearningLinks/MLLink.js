"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLLink = MLLink;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _url = _interopRequireDefault(require("url"));

var _risonNode = _interopRequireDefault(require("rison-node"));

var _useLocation = require("../../../../hooks/useLocation");

var _rison_helpers = require("../rison_helpers");

var _useApmPluginContext2 = require("../../../../hooks/useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function MLLink(_ref) {
  var children = _ref.children,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? '' : _ref$path,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? {} : _ref$query;

  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  var location = (0, _useLocation.useLocation)();
  var risonQuery = (0, _rison_helpers.getTimepickerRisonData)(location.search);

  if (query.ml) {
    risonQuery.ml = query.ml;
  }

  var href = _url.default.format({
    pathname: core.http.basePath.prepend('/app/ml'),
    hash: "".concat(path, "?_g=").concat(_risonNode.default.encode(risonQuery))
  });

  return _react.default.createElement(_eui.EuiLink, {
    children: children,
    href: href
  });
}