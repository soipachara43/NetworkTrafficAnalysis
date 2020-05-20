"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showInitialLoadingSpinner = exports.getSignalsHistogramQuery = exports.formatSignalsData = void 0;

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var formatSignalsData = function formatSignalsData(signalsData) {
  var _ref, _signalsData$aggregat, _signalsData$aggregat2;

  var groupBuckets = (_ref = signalsData === null || signalsData === void 0 ? void 0 : (_signalsData$aggregat = signalsData.aggregations) === null || _signalsData$aggregat === void 0 ? void 0 : (_signalsData$aggregat2 = _signalsData$aggregat.signalsByGrouping) === null || _signalsData$aggregat2 === void 0 ? void 0 : _signalsData$aggregat2.buckets) !== null && _ref !== void 0 ? _ref : [];
  return groupBuckets.reduce(function (acc, _ref2) {
    var _signals$buckets;

    var group = _ref2.key,
        signals = _ref2.signals;
    var signalsBucket = (_signals$buckets = signals.buckets) !== null && _signals$buckets !== void 0 ? _signals$buckets : [];
    return [].concat(_toConsumableArray(acc), _toConsumableArray(signalsBucket.map(function (_ref3) {
      var key = _ref3.key,
          doc_count = _ref3.doc_count;
      return {
        x: key,
        y: doc_count,
        g: group
      };
    })));
  }, []);
};

exports.formatSignalsData = formatSignalsData;

var getSignalsHistogramQuery = function getSignalsHistogramQuery(stackByField, from, to, additionalFilters) {
  return {
    aggs: {
      signalsByGrouping: {
        terms: {
          field: stackByField,
          missing: stackByField.endsWith('.ip') ? '0.0.0.0' : i18n.ALL_OTHERS,
          order: {
            _count: 'desc'
          },
          size: 10
        },
        aggs: {
          signals: {
            date_histogram: {
              field: '@timestamp',
              fixed_interval: "".concat(Math.floor((to - from) / 32), "ms"),
              min_doc_count: 0,
              extended_bounds: {
                min: from,
                max: to
              }
            }
          }
        }
      }
    },
    query: {
      bool: {
        filter: [].concat(_toConsumableArray(additionalFilters), [{
          range: {
            '@timestamp': {
              gte: from,
              lte: to
            }
          }
        }])
      }
    }
  };
};
/**
 * Returns `true` when the signals histogram initial loading spinner should be shown
 *
 * @param isInitialLoading The loading spinner will only be displayed if this value is `true`, because after initial load, a different, non-spinner loading indicator is displayed
 * @param isLoadingSignals When `true`, IO is being performed to request signals (for rendering in the histogram)
 */


exports.getSignalsHistogramQuery = getSignalsHistogramQuery;

var showInitialLoadingSpinner = function showInitialLoadingSpinner(_ref4) {
  var isInitialLoading = _ref4.isInitialLoading,
      isLoadingSignals = _ref4.isLoadingSignals;
  return isInitialLoading && isLoadingSignals;
};

exports.showInitialLoadingSpinner = showInitialLoadingSpinner;