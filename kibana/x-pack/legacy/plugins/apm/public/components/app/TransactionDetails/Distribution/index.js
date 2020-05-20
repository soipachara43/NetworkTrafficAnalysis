"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormattedBuckets = getFormattedBuckets;
exports.TransactionDistribution = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _d = _interopRequireDefault(require("d3"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _formatters = require("../../../../utils/formatters");

var _Histogram = _interopRequireDefault(require("../../../shared/charts/Histogram"));

var _EmptyMessage = require("../../../shared/EmptyMessage");

var _url_helpers = require("../../../shared/Links/url_helpers");

var _history = require("../../../../utils/history");

var _LoadingStatePrompt = require("../../../shared/LoadingStatePrompt");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getFormattedBuckets(buckets, bucketSize) {
  if (!buckets) {
    return [];
  }

  return buckets.map(function (_ref) {
    var samples = _ref.samples,
        count = _ref.count,
        key = _ref.key;
    return {
      samples: samples,
      x0: key,
      x: key + bucketSize,
      y: count,
      style: {
        cursor: (0, _lodash.isEmpty)(samples) ? 'default' : 'pointer'
      }
    };
  });
}

var getFormatYShort = function getFormatYShort(transactionType) {
  return function (t) {
    return _i18n.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.unitShortLabel', {
      defaultMessage: '{transCount} {transType, select, request {req.} other {trans.}}',
      values: {
        transCount: t,
        transType: transactionType
      }
    });
  };
};

var getFormatYLong = function getFormatYLong(transactionType) {
  return function (t) {
    return transactionType === 'request' ? _i18n.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.requestTypeUnitLongLabel', {
      defaultMessage: '{transCount, plural, =0 {# request} one {# request} other {# requests}}',
      values: {
        transCount: t
      }
    }) : _i18n.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.transactionTypeUnitLongLabel', {
      defaultMessage: '{transCount, plural, =0 {# transaction} one {# transaction} other {# transactions}}',
      values: {
        transCount: t
      }
    });
  };
};

var TransactionDistribution = function TransactionDistribution(props) {
  var distribution = props.distribution,
      transactionType = props.urlParams.transactionType,
      isLoading = props.isLoading,
      bucketIndex = props.bucketIndex;
  var formatYShort = (0, _react.useCallback)(getFormatYShort(transactionType), [transactionType]);
  var formatYLong = (0, _react.useCallback)(getFormatYLong(transactionType), [transactionType]); // no data in response

  if (!distribution || distribution.noHits) {
    // only show loading state if there is no data - else show stale data until new data has loaded
    if (isLoading) {
      return _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null);
    }

    return _react.default.createElement(_EmptyMessage.EmptyMessage, {
      heading: _i18n.i18n.translate('xpack.apm.transactionDetails.notFoundLabel', {
        defaultMessage: 'No transactions were found.'
      })
    });
  }

  var buckets = getFormattedBuckets(distribution.buckets, distribution.bucketSize);
  var xMax = _d.default.max(buckets, function (d) {
    return d.x;
  }) || 0;
  var timeFormatter = (0, _formatters.getDurationFormatter)(xMax);
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChartTitle', {
    defaultMessage: 'Transactions duration distribution'
  }), ' ', _react.default.createElement(_eui.EuiIconTip, {
    title: _i18n.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChartTooltip.samplingLabel', {
      defaultMessage: 'Sampling'
    }),
    content: _i18n.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChartTooltip.samplingDescription', {
      defaultMessage: "Each bucket will show a sample transaction. If there's no sample available, it's most likely because of the sampling limit set in the agent configuration."
    }),
    position: "top"
  }))), _react.default.createElement(_Histogram.default, {
    buckets: buckets,
    bucketSize: distribution.bucketSize,
    bucketIndex: bucketIndex,
    onClick: function onClick(bucket) {
      if (!(0, _lodash.isEmpty)(bucket.samples)) {
        var sample = bucket.samples[0];

        _history.history.push(_objectSpread({}, _history.history.location, {
          search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(_history.history.location.search), {
            transactionId: sample.transactionId,
            traceId: sample.traceId
          }))
        }));
      }
    },
    formatX: function formatX(time) {
      return timeFormatter(time).formatted;
    },
    formatYShort: formatYShort,
    formatYLong: formatYLong,
    verticalLineHover: function verticalLineHover(bucket) {
      return (0, _lodash.isEmpty)(bucket.samples);
    },
    backgroundHover: function backgroundHover(bucket) {
      return !(0, _lodash.isEmpty)(bucket.samples);
    },
    tooltipHeader: function tooltipHeader(bucket) {
      var xFormatted = timeFormatter(bucket.x);
      var x0Formatted = timeFormatter(bucket.x0);
      return "".concat(x0Formatted.value, " - ").concat(xFormatted.value, " ").concat(xFormatted.unit);
    },
    tooltipFooter: function tooltipFooter(bucket) {
      return (0, _lodash.isEmpty)(bucket.samples) && _i18n.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.noSampleTooltip', {
        defaultMessage: 'No sample available for this bucket'
      });
    }
  }));
};

exports.TransactionDistribution = TransactionDistribution;