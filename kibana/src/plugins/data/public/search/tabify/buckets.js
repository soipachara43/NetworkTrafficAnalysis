"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabifyBuckets = void 0;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isRangeEqual = function isRangeEqual(range1, range2) {
  return (range1 === null || range1 === void 0 ? void 0 : range1.from) === (range2 === null || range2 === void 0 ? void 0 : range2.from) && (range1 === null || range1 === void 0 ? void 0 : range1.to) === (range2 === null || range2 === void 0 ? void 0 : range2.to);
};

var TabifyBuckets =
/*#__PURE__*/
function () {
  function TabifyBuckets(aggResp, aggParams, timeRange) {
    _classCallCheck(this, TabifyBuckets);

    _defineProperty(this, "length", void 0);

    _defineProperty(this, "objectMode", void 0);

    _defineProperty(this, "buckets", void 0);

    _defineProperty(this, "_keys", []);

    if (aggResp && aggResp.buckets) {
      this.buckets = aggResp.buckets;
    } else if (aggResp) {
      // Some Bucket Aggs only return a single bucket (like filter).
      // In those instances, the aggResp is the content of the single bucket.
      this.buckets = [aggResp];
    } else {
      this.buckets = [];
    }

    this.objectMode = (0, _lodash.isPlainObject)(this.buckets);

    if (this.objectMode) {
      this._keys = (0, _lodash.keys)(this.buckets);
      this.length = this._keys.length;
    } else {
      this.length = this.buckets.length;
    }

    if (this.length && aggParams) {
      this.orderBucketsAccordingToParams(aggParams);

      if (aggParams.drop_partials) {
        this.dropPartials(aggParams, timeRange);
      }
    }
  }

  _createClass(TabifyBuckets, [{
    key: "forEach",
    value: function forEach(fn) {
      var buckets = this.buckets;

      if (this.objectMode) {
        this._keys.forEach(function (key) {
          fn(buckets[key], key);
        });
      } else {
        buckets.forEach(function (bucket) {
          fn(bucket, bucket.key);
        });
      }
    }
  }, {
    key: "orderBucketsAccordingToParams",
    value: function orderBucketsAccordingToParams(params) {
      var _this = this;

      if (params.filters && this.objectMode) {
        this._keys = params.filters.map(function (filter) {
          var query = (0, _lodash.get)(filter, 'input.query.query_string.query', filter.input.query);
          var queryString = typeof query === 'string' ? query : JSON.stringify(query);
          return filter.label || queryString || '*';
        });
      } else if (params.ranges && this.objectMode) {
        this._keys = params.ranges.map(function (range) {
          return (0, _lodash.findKey)(_this.buckets, function (el) {
            return isRangeEqual(el, range);
          });
        });
      } else if (params.ranges && params.field.type !== 'date') {
        var ranges = params.ranges;

        if (params.ipRangeType) {
          ranges = params.ipRangeType === 'mask' ? ranges.mask : ranges.fromTo;
        }

        this.buckets = ranges.map(function (range) {
          if (range.mask) {
            return _this.buckets.find(function (el) {
              return el.key === range.mask;
            });
          }

          return _this.buckets.find(function (el) {
            return isRangeEqual(el, range);
          });
        });
      }
    } // dropPartials should only be called if the aggParam setting is enabled,
    // and the agg field is the same as the Time Range.

  }, {
    key: "dropPartials",
    value: function dropPartials(params, timeRange) {
      if (!timeRange || this.buckets.length <= 1 || this.objectMode || params.field.name !== timeRange.name) {
        return;
      }

      var interval = this.buckets[1].key - this.buckets[0].key;
      this.buckets = this.buckets.filter(function (bucket) {
        if ((0, _moment.default)(bucket.key).isBefore(timeRange.gte)) {
          return false;
        }

        if ((0, _moment.default)(bucket.key + interval).isAfter(timeRange.lte)) {
          return false;
        }

        return true;
      });
      this.length = this.buckets.length;
    }
  }]);

  return TabifyBuckets;
}();

exports.TabifyBuckets = TabifyBuckets;