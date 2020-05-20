"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabbedAggResponseWriter = void 0;

var _lodash = require("lodash");

var _get_columns = require("./get_columns");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Writer class that collects information about an aggregation response and
 * produces a table, or a series of tables.
 */
var TabbedAggResponseWriter =
/*#__PURE__*/
function () {
  /**
   * @param {AggConfigs} aggs - the agg configs object to which the aggregation response correlates
   * @param {boolean} metricsAtAllLevels - setting to true will produce metrics for every bucket
   * @param {boolean} partialRows - setting to true will not remove rows with missing values
   */
  function TabbedAggResponseWriter(aggs, _ref) {
    var _ref$metricsAtAllLeve = _ref.metricsAtAllLevels,
        metricsAtAllLevels = _ref$metricsAtAllLeve === void 0 ? false : _ref$metricsAtAllLeve,
        _ref$partialRows = _ref.partialRows,
        partialRows = _ref$partialRows === void 0 ? false : _ref$partialRows;

    _classCallCheck(this, TabbedAggResponseWriter);

    _defineProperty(this, "columns", void 0);

    _defineProperty(this, "rows", []);

    _defineProperty(this, "bucketBuffer", []);

    _defineProperty(this, "metricBuffer", []);

    _defineProperty(this, "partialRows", void 0);

    this.partialRows = partialRows;
    this.columns = (0, _get_columns.tabifyGetColumns)(aggs.getResponseAggs(), !metricsAtAllLevels);
    this.rows = [];
  }
  /**
   * Create a new row by reading the row buffer and bucketBuffer
   */


  _createClass(TabbedAggResponseWriter, [{
    key: "row",
    value: function row() {
      var rowBuffer = {};
      this.bucketBuffer.forEach(function (bucket) {
        rowBuffer[bucket.id] = bucket.value;
      });
      this.metricBuffer.forEach(function (metric) {
        rowBuffer[metric.id] = metric.value;
      });
      var isPartialRow = !this.columns.every(function (column) {
        return rowBuffer.hasOwnProperty(column.id);
      });
      var removePartial = isPartialRow && !this.partialRows;

      if (!(0, _lodash.isEmpty)(rowBuffer) && !removePartial) {
        this.rows.push(rowBuffer);
      }
    }
  }, {
    key: "response",
    value: function response() {
      return {
        columns: this.columns,
        rows: this.rows
      };
    }
  }]);

  return TabbedAggResponseWriter;
}();

exports.TabbedAggResponseWriter = TabbedAggResponseWriter;