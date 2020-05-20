"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormattedBuckets = getFormattedBuckets;
exports.ErrorDistribution = ErrorDistribution;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _d3Scale = require("d3-scale");

var _d = _interopRequireDefault(require("d3"));

var _react = _interopRequireDefault(require("react"));

var _formatters = require("../../../../utils/formatters");

var _getTimezoneOffsetInMs = require("../../../shared/charts/CustomPlot/getTimezoneOffsetInMs");

var _Histogram = _interopRequireDefault(require("../../../shared/charts/Histogram"));

var _EmptyMessage = require("../../../shared/EmptyMessage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
function getFormattedBuckets(buckets, bucketSize) {
  if (!buckets) {
    return null;
  }

  return buckets.map(function (_ref) {
    var count = _ref.count,
        key = _ref.key;
    return {
      x0: key,
      x: key + bucketSize,
      y: count
    };
  });
}

var tooltipHeader = function tooltipHeader(bucket) {
  return (0, _formatters.asRelativeDateTimeRange)(bucket.x0, bucket.x);
};

function ErrorDistribution(_ref2) {
  var distribution = _ref2.distribution,
      title = _ref2.title;
  var buckets = getFormattedBuckets(distribution.buckets, distribution.bucketSize);

  if (!buckets || distribution.noHits) {
    return _react.default.createElement(_EmptyMessage.EmptyMessage, {
      heading: _i18n.i18n.translate('xpack.apm.errorGroupDetails.noErrorsLabel', {
        defaultMessage: 'No errors were found'
      })
    });
  }

  var xMin = _d.default.min(buckets, function (d) {
    return d.x0;
  });

  var xMax = _d.default.max(buckets, function (d) {
    return d.x;
  });

  var tickFormat = (0, _d3Scale.scaleUtc)().domain([xMin, xMax]).tickFormat();
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, title)), _react.default.createElement(_Histogram.default, {
    tooltipHeader: tooltipHeader,
    verticalLineHover: function verticalLineHover(bucket) {
      return bucket.x;
    },
    xType: "time-utc",
    formatX: function formatX(value) {
      var time = value.getTime();
      return tickFormat(new Date(time - (0, _getTimezoneOffsetInMs.getTimezoneOffsetInMs)(time)));
    },
    buckets: buckets,
    bucketSize: distribution.bucketSize,
    formatYShort: function formatYShort(value) {
      return _i18n.i18n.translate('xpack.apm.errorGroupDetails.occurrencesShortLabel', {
        defaultMessage: '{occCount} occ.',
        values: {
          occCount: value
        }
      });
    },
    formatYLong: function formatYLong(value) {
      return _i18n.i18n.translate('xpack.apm.errorGroupDetails.occurrencesLongLabel', {
        defaultMessage: '{occCount} occurrences',
        values: {
          occCount: value
        }
      });
    }
  }));
}