"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationLineSeriesList = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _helper = require("../../../lib/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DurationLineSeriesList = function DurationLineSeriesList(_ref) {
  var lines = _ref.lines;
  return _react.default.createElement(_react.default.Fragment, null, lines.map(function (_ref2) {
    var name = _ref2.name,
        line = _ref2.line;
    return _react.default.createElement(_charts.LineSeries, {
      curve: _charts.CurveType.CURVE_MONOTONE_X // this id is used for the line chart representing the average duration length
      ,
      data: line.map(function (_ref3) {
        var x = _ref3.x,
            y = _ref3.y;
        return [x, (0, _helper.convertMicrosecondsToMilliseconds)(y || null)];
      }),
      id: "loc-avg-".concat(name),
      key: "locline-".concat(name),
      name: name,
      xAccessor: 0,
      xScaleType: "time",
      yAccessors: [1],
      yScaleToDataExtent: false,
      yScaleType: "linear"
    });
  }));
};

exports.DurationLineSeriesList = DurationLineSeriesList;