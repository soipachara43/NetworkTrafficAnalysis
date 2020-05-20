"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "METRIC_TYPE", {
  enumerable: true,
  get: function get() {
    return _public.METRIC_TYPE;
  }
});
exports.trackCanvasUiMetric = void 0;

var _public = require("../../../../../../src/legacy/core_plugins/ui_metric/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var trackCanvasUiMetric = (0, _public.createUiStatsReporter)('canvas');
exports.trackCanvasUiMetric = trackCanvasUiMetric;