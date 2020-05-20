"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogSummary = void 0;

var _react = require("react");

var _cancellable_effect = require("../../../utils/cancellable_effect");

var _fetch_log_summary = require("./api/fetch_log_summary");

var _bucket_size = require("./bucket_size");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogSummary = function useLogSummary(sourceId, startTimestamp, endTimestamp, filterQuery) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      logSummaryBuckets = _useState2[0],
      setLogSummaryBuckets = _useState2[1];

  var bucketSize = (0, _bucket_size.useBucketSize)(startTimestamp, endTimestamp);
  (0, _cancellable_effect.useCancellableEffect)(function (getIsCancelled) {
    if (startTimestamp === null || endTimestamp === null || bucketSize === null) {
      return;
    }

    (0, _fetch_log_summary.fetchLogSummary)({
      sourceId: sourceId,
      startTimestamp: startTimestamp,
      endTimestamp: endTimestamp,
      bucketSize: bucketSize,
      query: filterQuery
    }).then(function (response) {
      if (!getIsCancelled()) {
        setLogSummaryBuckets(response.data.buckets);
      }
    });
  }, [sourceId, filterQuery, startTimestamp, endTimestamp, bucketSize]);
  return {
    buckets: logSummaryBuckets,
    start: startTimestamp,
    end: endTimestamp
  };
};

exports.useLogSummary = useLogSummary;