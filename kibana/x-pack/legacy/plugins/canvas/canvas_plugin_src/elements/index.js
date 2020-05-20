"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementSpecs = void 0;

var _elements = require("../../i18n/elements");

var _area_chart = require("./area_chart");

var _bubble_chart = require("./bubble_chart");

var _debug = require("./debug");

var _donut = require("./donut");

var _dropdown_filter = require("./dropdown_filter");

var _horizontal_bar_chart = require("./horizontal_bar_chart");

var _horizontal_progress_bar = require("./horizontal_progress_bar");

var _horizontal_progress_pill = require("./horizontal_progress_pill");

var _image = require("./image");

var _line_chart = require("./line_chart");

var _markdown = require("./markdown");

var _metric = require("./metric");

var _pie = require("./pie");

var _plot = require("./plot");

var _progress_gauge = require("./progress_gauge");

var _progress_semicircle = require("./progress_semicircle");

var _progress_wheel = require("./progress_wheel");

var _repeat_image = require("./repeat_image");

var _reveal_image = require("./reveal_image");

var _shape = require("./shape");

var _table = require("./table");

var _tilted_pie = require("./tilted_pie");

var _time_filter = require("./time_filter");

var _vert_bar_chart = require("./vert_bar_chart");

var _vertical_progress_bar = require("./vertical_progress_bar");

var _vertical_progress_pill = require("./vertical_progress_pill");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const elementSpecs = (0, _elements.applyElementStrings)([_area_chart.areaChart, _bubble_chart.bubbleChart, _debug.debug, _donut.donut, _dropdown_filter.dropdownFilter, _image.image, _horizontal_bar_chart.horizontalBarChart, _horizontal_progress_bar.horizontalProgressBar, _horizontal_progress_pill.horizontalProgressPill, _line_chart.lineChart, _markdown.markdown, _metric.metric, _pie.pie, _plot.plot, _progress_gauge.progressGauge, _progress_semicircle.progressSemicircle, _progress_wheel.progressWheel, _repeat_image.repeatImage, _reveal_image.revealImage, _shape.shape, _table.table, _tilted_pie.tiltedPie, _time_filter.timeFilter, _vert_bar_chart.verticalBarChart, _vertical_progress_bar.verticalProgressBar, _vertical_progress_pill.verticalProgressPill]);
exports.elementSpecs = elementSpecs;