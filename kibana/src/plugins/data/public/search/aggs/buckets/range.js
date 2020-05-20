"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeBucketAgg = void 0;

var _i18n = require("@kbn/i18n");

var _bucket_agg_type = require("./_bucket_agg_type");

var _common = require("../../../../common");

var _range_key = require("./range_key");

var _range = require("./create_filter/range");

var _bucket_agg_types = require("./bucket_agg_types");

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
var keyCaches = new WeakMap();
var formats = new WeakMap();

var rangeTitle = _i18n.i18n.translate('data.search.aggs.buckets.rangeTitle', {
  defaultMessage: 'Range'
});

var rangeBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.RANGE,
  title: rangeTitle,
  createFilter: _range.createFilterRange,
  makeLabel: function makeLabel(aggConfig) {
    return _i18n.i18n.translate('data.search.aggs.aggTypesLabel', {
      defaultMessage: '{fieldName} ranges',
      values: {
        fieldName: aggConfig.getFieldDisplayName()
      }
    });
  },
  getKey: function getKey(bucket, key, agg) {
    var keys = keyCaches.get(agg);

    if (!keys) {
      keys = new Map();
      keyCaches.set(agg, keys);
    }

    var id = _range_key.RangeKey.idBucket(bucket);

    key = keys.get(id);

    if (!key) {
      key = new _range_key.RangeKey(bucket);
      keys.set(id, key);
    }

    return key;
  },
  getFormat: function getFormat(agg) {
    var aggFormat = formats.get(agg);
    if (aggFormat) return aggFormat;

    var RangeFormat = _common.FieldFormat.from(function (range) {
      var format = agg.fieldOwnFormatter();
      var gte = "\u2265";
      var lt = "<";
      return _i18n.i18n.translate('data.search.aggs.aggTypes.rangesFormatMessage', {
        defaultMessage: '{gte} {from} and {lt} {to}',
        values: {
          gte: gte,
          from: format(range.gte),
          lt: lt,
          to: format(range.lt)
        }
      });
    });

    aggFormat = new RangeFormat();
    formats.set(agg, aggFormat);
    return aggFormat;
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: [_common.KBN_FIELD_TYPES.NUMBER]
  }, {
    name: 'ranges',
    default: [{
      from: 0,
      to: 1000
    }, {
      from: 1000,
      to: 2000
    }],
    write: function write(aggConfig, output) {
      output.params.ranges = aggConfig.params.ranges;
      output.params.keyed = true;
    }
  }]
});
exports.rangeBucketAgg = rangeBucketAgg;