"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateRangeBucketAgg = void 0;

var _lodash = require("lodash");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _i18n = require("@kbn/i18n");

var _bucket_agg_types = require("./bucket_agg_types");

var _bucket_agg_type = require("./_bucket_agg_type");

var _date_range = require("./create_filter/date_range");

var _date_range2 = require("./lib/date_range");

var _common = require("../../../../common");

var _services = require("../../../../public/services");

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
var dateRangeTitle = _i18n.i18n.translate('data.search.aggs.buckets.dateRangeTitle', {
  defaultMessage: 'Date Range'
});

var dateRangeBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.DATE_RANGE,
  title: dateRangeTitle,
  createFilter: _date_range.createFilterDateRange,
  getKey: function getKey(_ref) {
    var from = _ref.from,
        to = _ref.to;
    return {
      from: from,
      to: to
    };
  },
  getFormat: function getFormat(agg) {
    var fieldFormatsService = (0, _services.getFieldFormats)();
    var formatter = agg.fieldOwnFormatter(_common.TEXT_CONTEXT_TYPE, fieldFormatsService.getDefaultInstance(_common.KBN_FIELD_TYPES.DATE));

    var DateRangeFormat = _common.FieldFormat.from(function (range) {
      return (0, _date_range2.convertDateRangeToString)(range, formatter);
    });

    return new DateRangeFormat();
  },
  makeLabel: function makeLabel(aggConfig) {
    return aggConfig.getFieldDisplayName() + ' date ranges';
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _common.KBN_FIELD_TYPES.DATE,
    default: function _default(agg) {
      return agg.getIndexPattern().timeFieldName;
    }
  }, {
    name: 'ranges',
    default: [{
      from: 'now-1w/w',
      to: 'now'
    }]
  }, {
    name: 'time_zone',
    default: undefined,
    // Implimentation method is the same as that of date_histogram
    serialize: function serialize() {
      return undefined;
    },
    write: function write(agg, output) {
      var field = agg.getParam('field');
      var tz = agg.getParam('time_zone');

      if (!tz && field) {
        tz = (0, _lodash.get)(agg.getIndexPattern(), ['typeMeta', 'aggs', 'date_range', field.name, 'time_zone']);
      }

      if (!tz) {
        var config = (0, _services.getUiSettings)();

        var detectedTimezone = _momentTimezone.default.tz.guess();

        var tzOffset = (0, _momentTimezone.default)().format('Z');
        var isDefaultTimezone = config.isDefault('dateFormat:tz');
        tz = isDefaultTimezone ? detectedTimezone || tzOffset : config.get('dateFormat:tz');
      }

      output.params.time_zone = tz;
    }
  }]
});
exports.dateRangeBucketAgg = dateRangeBucketAgg;