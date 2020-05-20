"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSeriesData = buildSeriesData;
exports.buildOptions = buildOptions;
exports.colors = exports.SERIES_ID_ATTR = void 0;

var _lodash = require("lodash");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _lib = require("../../../../../plugins/timelion/common/lib");

var _xaxis_formatter = require("./xaxis_formatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var colors = ['#01A4A4', '#C66', '#D0D102', '#616161', '#00A1CB', '#32742C', '#F18D05', '#113F8C', '#61AE24', '#D70060'];
exports.colors = colors;
var SERIES_ID_ATTR = 'data-series-id';
exports.SERIES_ID_ATTR = SERIES_ID_ATTR;

function buildSeriesData(chart, options) {
  var seriesData = chart.map(function (series, seriesIndex) {
    var newSeries = (0, _lodash.cloneDeep)((0, _lodash.defaults)(series, {
      shadowSize: 0,
      lines: {
        lineWidth: 3
      }
    }));
    newSeries._id = seriesIndex;

    if (series.color) {
      var span = document.createElement('span');
      span.style.color = series.color;
      newSeries.color = span.style.color;
    }

    if (series._hide) {
      newSeries.data = [];
      newSeries.stack = false;
      newSeries.label = "(hidden) ".concat(series.label);
    }

    if (series._global) {
      (0, _lodash.merge)(options, series._global, function (objVal, srcVal) {
        // This is kind of gross, it means that you can't replace a global value with a null
        // best you can do is an empty string. Deal with it.
        if (objVal == null) {
          return srcVal;
        }

        if (srcVal == null) {
          return objVal;
        }
      });
    }

    return newSeries;
  });
  return (0, _lodash.compact)(seriesData);
}

function buildOptions(intervalValue, timefilter, uiSettings) {
  var clientWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var showGrid = arguments.length > 4 ? arguments[4] : undefined;
  // Get the X-axis tick format
  var time = timefilter.getBounds();
  var interval = (0, _lib.calculateInterval)(time.min && time.min.valueOf() || 0, time.max && time.max.valueOf() || 0, uiSettings.get('timelion:target_buckets') || 200, intervalValue, uiSettings.get('timelion:min_interval') || '1ms');
  var format = (0, _xaxis_formatter.xaxisFormatterProvider)(uiSettings)(interval);
  var tickLetterWidth = 7;
  var tickPadding = 45;
  var options = {
    xaxis: {
      mode: 'time',
      tickLength: 5,
      timezone: 'browser',
      // Calculate how many ticks can fit on the axis
      ticks: Math.floor(clientWidth / (format.length * tickLetterWidth + tickPadding)),
      // Use moment to format ticks so we get timezone correction
      tickFormatter: function tickFormatter(val) {
        return (0, _momentTimezone.default)(val).format(format);
      }
    },
    selection: {
      mode: 'x',
      color: '#ccc'
    },
    crosshair: {
      mode: 'x',
      color: '#C66',
      lineWidth: 2
    },
    colors: colors,
    grid: {
      show: showGrid,
      borderWidth: 0,
      borderColor: null,
      margin: 10,
      hoverable: true,
      autoHighlight: false
    },
    legend: {
      backgroundColor: 'rgb(255,255,255,0)',
      position: 'nw',
      labelBoxBorderColor: 'rgb(255,255,255,0)',
      labelFormatter: function labelFormatter(label, series) {
        var wrapperSpan = document.createElement('span');
        var labelSpan = document.createElement('span');
        var numberSpan = document.createElement('span');
        wrapperSpan.setAttribute('class', 'ngLegendValue');
        wrapperSpan.setAttribute(SERIES_ID_ATTR, "".concat(series._id));
        labelSpan.appendChild(document.createTextNode(label));
        numberSpan.setAttribute('class', 'ngLegendValueNumber');
        wrapperSpan.appendChild(labelSpan);
        wrapperSpan.appendChild(numberSpan);
        return wrapperSpan.outerHTML;
      }
    }
  };
  return options;
}