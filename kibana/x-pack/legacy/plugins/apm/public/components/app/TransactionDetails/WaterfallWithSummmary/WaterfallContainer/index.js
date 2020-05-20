"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaterfallContainer = WaterfallContainer;

var _react = _interopRequireDefault(require("react"));

var _ServiceLegends = require("./ServiceLegends");

var _Waterfall = require("./Waterfall");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function WaterfallContainer(_ref) {
  var location = _ref.location,
      urlParams = _ref.urlParams,
      waterfall = _ref.waterfall,
      exceedsMax = _ref.exceedsMax;

  if (!waterfall) {
    return null;
  }

  return _react.default.createElement("div", null, _react.default.createElement(_ServiceLegends.ServiceLegends, {
    serviceColors: waterfall.serviceColors
  }), _react.default.createElement(_Waterfall.Waterfall, {
    location: location,
    waterfallItemId: urlParams.waterfallItemId,
    waterfall: waterfall,
    exceedsMax: exceedsMax
  }));
}