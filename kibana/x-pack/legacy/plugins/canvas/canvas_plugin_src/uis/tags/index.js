"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagSpecs = void 0;

var _chart = require("./chart");

var _filter = require("./filter");

var _graphic = require("./graphic");

var _presentation = require("./presentation");

var _proportion = require("./proportion");

var _report = require("./report");

var _text = require("./text");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Registry expects a function that returns a spec object
const tagSpecs = [_chart.chart, _filter.filter, _graphic.graphic, _presentation.presentation, _proportion.proportion, _report.report, _text.text];
exports.tagSpecs = tagSpecs;