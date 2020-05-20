"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDateHistogramBucketAggConfig = isDateHistogramBucketAggConfig;
exports.dateHistogramBucketAgg = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _i18n = require("@kbn/i18n");

var _time_buckets = require("./lib/time_buckets");

var _bucket_agg_type = require("./_bucket_agg_type");

var _bucket_agg_types = require("./bucket_agg_types");

var _date_histogram = require("./create_filter/date_histogram");

var _interval_options = require("./_interval_options");

var _common = require("../../../../common");

var _agg_params = require("../agg_params");

var _metric_agg_type = require("../metrics/metric_agg_type");

var _services = require("../../../../public/services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var detectedTimezone = _momentTimezone.default.tz.guess();

var tzOffset = (0, _momentTimezone.default)().format('Z');

var updateTimeBuckets = function updateTimeBuckets(agg, timefilter, customBuckets) {
  var bounds = agg.params.timeRange ? timefilter.calculateBounds(agg.params.timeRange) : null;
  var buckets = customBuckets || agg.buckets;
  buckets.setBounds(agg.fieldIsTimeField() && bounds);
  buckets.setInterval(agg.params.interval);
}; // TODO: Need to incorporate these properly into TimeBuckets


function isDateHistogramBucketAggConfig(agg) {
  return Boolean(agg.buckets);
}

var dateHistogramBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.DATE_HISTOGRAM,
  title: _i18n.i18n.translate('data.search.aggs.buckets.dateHistogramTitle', {
    defaultMessage: 'Date Histogram'
  }),
  ordered: {
    date: true
  },
  makeLabel: function makeLabel(agg) {
    var output = {};

    if (this.params) {
      output = (0, _agg_params.writeParams)(this.params, agg);
    }

    var field = agg.getFieldDisplayName();
    return _i18n.i18n.translate('data.search.aggs.buckets.dateHistogramLabel', {
      defaultMessage: '{fieldName} per {intervalDescription}',
      values: {
        fieldName: field,
        intervalDescription: output.metricScaleText || output.bucketInterval.description
      }
    });
  },
  createFilter: _date_histogram.createFilterDateHistogram,
  decorateAggConfig: function decorateAggConfig() {
    var uiSettings = (0, _services.getUiSettings)();
    var buckets;
    return {
      buckets: {
        configurable: true,
        get: function get() {
          if (buckets) return buckets;
          var timefilter = (0, _services.getQueryService)().timefilter.timefilter;
          buckets = new _time_buckets.TimeBuckets({
            uiSettings: uiSettings
          });
          updateTimeBuckets(this, timefilter, buckets);
          return buckets;
        }
      }
    };
  },
  getFormat: function getFormat(agg) {
    var DateFieldFormat = (0, _services.getFieldFormats)().getType(_common.FIELD_FORMAT_IDS.DATE);

    if (!DateFieldFormat) {
      throw new Error('Unable to retrieve Date Field Format');
    }

    return new DateFieldFormat({
      pattern: agg.buckets.getScaledDateFormat()
    }, function (key) {
      return (0, _services.getUiSettings)().get(key);
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _common.KBN_FIELD_TYPES.DATE,
    default: function _default(agg) {
      return agg.getIndexPattern().timeFieldName;
    },
    onChange: function onChange(agg) {
      if (_lodash.default.get(agg, 'params.interval') === 'auto' && !agg.fieldIsTimeField()) {
        delete agg.params.interval;
      }
    }
  }, {
    name: 'timeRange',
    default: null,
    write: _lodash.default.noop
  }, {
    name: 'useNormalizedEsInterval',
    default: true,
    write: _lodash.default.noop
  }, {
    name: 'scaleMetricValues',
    default: false,
    write: _lodash.default.noop,
    advanced: true
  }, {
    name: 'interval',
    deserialize: function deserialize(state, agg) {
      // For upgrading from 7.0.x to 7.1.x - intervals are now stored as key of options or custom value
      if (state === 'custom') {
        return _lodash.default.get(agg, 'params.customInterval');
      }

      var interval = _lodash.default.find(_interval_options.intervalOptions, {
        val: state
      }); // For upgrading from 4.0.x to 4.1.x - intervals are now stored as 'y' instead of 'year',
      // but this maps the old values to the new values


      if (!interval && state === 'year') {
        return 'y';
      }

      return state;
    },
    default: 'auto',
    options: _interval_options.intervalOptions,
    write: function write(agg, output, aggs) {
      var timefilter = (0, _services.getQueryService)().timefilter.timefilter;
      updateTimeBuckets(agg, timefilter);
      var _agg$params = agg.params,
          useNormalizedEsInterval = _agg$params.useNormalizedEsInterval,
          scaleMetricValues = _agg$params.scaleMetricValues;
      var interval = agg.buckets.getInterval(useNormalizedEsInterval);
      output.bucketInterval = interval;

      if (interval.expression === '0ms') {
        // We are hitting this code a couple of times while configuring in editor
        // with an interval of 0ms because the overall time range has not yet been
        // set. Since 0ms is not a valid ES interval, we cannot pass it through dateHistogramInterval
        // below, since it would throw an exception. So in the cases we still have an interval of 0ms
        // here we simply skip the rest of the method and never write an interval into the DSL, since
        // this DSL will anyway not be used before we're passing this code with an actual interval.
        return;
      }

      output.params = _objectSpread({}, output.params, {}, (0, _common.dateHistogramInterval)(interval.expression));
      var scaleMetrics = scaleMetricValues && interval.scaled && interval.scale < 1;

      if (scaleMetrics && aggs) {
        var metrics = aggs.aggs.filter(function (a) {
          return (0, _metric_agg_type.isMetricAggType)(a.type);
        });

        var all = _lodash.default.every(metrics, function (a) {
          var type = a.type;

          if ((0, _metric_agg_type.isMetricAggType)(type)) {
            return type.isScalable();
          }
        });

        if (all) {
          output.metricScale = interval.scale;
          output.metricScaleText = interval.preScaled.description;
        }
      }
    }
  }, {
    name: 'time_zone',
    default: undefined,
    // We don't ever want this parameter to be serialized out (when saving or to URLs)
    // since we do all the logic handling it "on the fly" in the `write` method, to prevent
    // time_zones being persisted into saved_objects
    serialize: _lodash.default.noop,
    write: function write(agg, output) {
      // If a time_zone has been set explicitly always prefer this.
      var tz = agg.params.time_zone;

      if (!tz && agg.params.field) {
        // If a field has been configured check the index pattern's typeMeta if a date_histogram on that
        // field requires a specific time_zone
        tz = _lodash.default.get(agg.getIndexPattern(), ['typeMeta', 'aggs', 'date_histogram', agg.params.field.name, 'time_zone']);
      }

      if (!tz) {
        var config = (0, _services.getUiSettings)(); // If the index pattern typeMeta data, didn't had a time zone assigned for the selected field use the configured tz

        var isDefaultTimezone = config.isDefault('dateFormat:tz');
        tz = isDefaultTimezone ? detectedTimezone || tzOffset : config.get('dateFormat:tz');
      }

      output.params.time_zone = tz;
    }
  }, {
    name: 'drop_partials',
    default: false,
    write: _lodash.default.noop,
    shouldShow: function shouldShow(agg) {
      var field = agg.params.field;
      return field && field.name && field.name === agg.getIndexPattern().timeFieldName;
    }
  }, {
    name: 'format'
  }, {
    name: 'min_doc_count',
    default: 1
  }, {
    name: 'extended_bounds',
    default: {},
    write: function write(agg, output) {
      var val = agg.params.extended_bounds;

      if (val.min != null || val.max != null) {
        output.params.extended_bounds = {
          min: (0, _momentTimezone.default)(val.min).valueOf(),
          max: (0, _momentTimezone.default)(val.max).valueOf()
        };
        return;
      }
    }
  }]
});
exports.dateHistogramBucketAgg = dateHistogramBucketAgg;