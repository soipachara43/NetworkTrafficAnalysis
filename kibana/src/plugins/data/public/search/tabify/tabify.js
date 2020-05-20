"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabifyAggResponse = tabifyAggResponse;

var _lodash = require("lodash");

var _response_writer = require("./response_writer");

var _buckets = require("./buckets");

var _aggs = require("../aggs");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Sets up the ResponseWriter and kicks off bucket collection.
 */
function tabifyAggResponse(aggConfigs, esResponse, respOpts) {
  /**
   * read an aggregation from a bucket, which *might* be found at key (if
   * the response came in object form), and will recurse down the aggregation
   * tree and will pass the read values to the ResponseWriter.
   */
  function collectBucket(aggs, write, bucket, key, aggScale) {
    var column = write.columns.shift();

    if (column) {
      var agg = column.aggConfig;
      var aggInfo = agg.write(aggs);
      aggScale *= aggInfo.metricScale || 1;

      switch (agg.type.type) {
        case _aggs.AggGroupNames.Buckets:
          var aggBucket = (0, _lodash.get)(bucket, agg.id);
          var tabifyBuckets = new _buckets.TabifyBuckets(aggBucket, agg.params, timeRange);

          if (tabifyBuckets.length) {
            tabifyBuckets.forEach(function (subBucket, tabifyBucketKey) {
              // if the bucket doesn't have value don't add it to the row
              // we don't want rows like: { column1: undefined, column2: 10 }
              var bucketValue = agg.getKey(subBucket, tabifyBucketKey);
              var hasBucketValue = typeof bucketValue !== 'undefined';

              if (hasBucketValue) {
                write.bucketBuffer.push({
                  id: column.id,
                  value: bucketValue
                });
              }

              collectBucket(aggs, write, subBucket, agg.getKey(subBucket, tabifyBucketKey), aggScale);

              if (hasBucketValue) {
                write.bucketBuffer.pop();
              }
            });
          } else if (respOpts === null || respOpts === void 0 ? void 0 : respOpts.partialRows) {
            // we don't have any buckets, but we do have metrics at this
            // level, then pass all the empty buckets and jump back in for
            // the metrics.
            write.columns.unshift(column);
            passEmptyBuckets(aggs, write, bucket, key, aggScale);
            write.columns.shift();
          } else {
            // we don't have any buckets, and we don't have isHierarchical
            // data, so no metrics, just try to write the row
            write.row();
          }

          break;

        case _aggs.AggGroupNames.Metrics:
          var value = agg.getValue(bucket); // since the aggregation could be a non integer (such as a max date)
          // only do the scaling calculation if it is needed.

          if (aggScale !== 1) {
            value *= aggScale;
          }

          write.metricBuffer.push({
            id: column.id,
            value: value
          });

          if (!write.columns.length) {
            // row complete
            write.row();
          } else {
            // process the next agg at this same level
            collectBucket(aggs, write, bucket, key, aggScale);
          }

          write.metricBuffer.pop();
          break;
      }

      write.columns.unshift(column);
    }
  } // write empty values for each bucket agg, then write
  // the metrics from the initial bucket using collectBucket()


  function passEmptyBuckets(aggs, write, bucket, key, aggScale) {
    var column = write.columns.shift();

    if (column) {
      var agg = column.aggConfig;

      switch (agg.type.type) {
        case _aggs.AggGroupNames.Metrics:
          // pass control back to collectBucket()
          write.columns.unshift(column);
          collectBucket(aggs, write, bucket, key, aggScale);
          return;

        case _aggs.AggGroupNames.Buckets:
          passEmptyBuckets(aggs, write, bucket, key, aggScale);
      }

      write.columns.unshift(column);
    }
  }

  var write = new _response_writer.TabbedAggResponseWriter(aggConfigs, respOpts || {});

  var topLevelBucket = _objectSpread({}, esResponse.aggregations, {
    doc_count: esResponse.hits.total
  });

  var timeRange; // Extract the time range object if provided

  if (respOpts && respOpts.timeRange) {
    var _Object$keys = Object.keys(respOpts.timeRange),
        _Object$keys2 = _slicedToArray(_Object$keys, 1),
        timeRangeKey = _Object$keys2[0];

    if (timeRangeKey) {
      timeRange = _objectSpread({
        name: timeRangeKey
      }, respOpts.timeRange[timeRangeKey]);
    }
  }

  collectBucket(aggConfigs, write, topLevelBucket, '', 1);
  return write.response();
}