"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _charts = require("./charts");

var _chart_wrapper = require("./charts/chart_wrapper");

var _snapshot_heading = require("./snapshot_heading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SNAPSHOT_CHART_WIDTH = 144;
var SNAPSHOT_CHART_HEIGHT = 144;

/**
 * This component visualizes a KPI and histogram chart to help users quickly
 * glean the status of their uptime environment.
 * @param props the props required by the component
 */
var SnapshotComponent = function SnapshotComponent(_ref) {
  var count = _ref.count,
      height = _ref.height,
      loading = _ref.loading;
  return _react.default.createElement(_chart_wrapper.ChartWrapper, {
    loading: loading,
    height: height
  }, _react.default.createElement(_snapshot_heading.SnapshotHeading, {
    total: count.total
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_charts.DonutChart, {
    up: count.up,
    down: count.down,
    height: SNAPSHOT_CHART_HEIGHT,
    width: SNAPSHOT_CHART_WIDTH
  }));
};

exports.SnapshotComponent = SnapshotComponent;