"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.medianMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _metric_agg_types = require("./metric_agg_types");

var _common = require("../../../../common");

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
var medianTitle = _i18n.i18n.translate('data.search.aggs.metrics.medianTitle', {
  defaultMessage: 'Median'
});

var medianMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.MEDIAN,
  dslName: 'percentiles',
  title: medianTitle,
  makeLabel: function makeLabel(aggConfig) {
    return _i18n.i18n.translate('data.search.aggs.metrics.medianLabel', {
      defaultMessage: 'Median {field}',
      values: {
        field: aggConfig.getFieldDisplayName()
      }
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: [_common.KBN_FIELD_TYPES.NUMBER, _common.KBN_FIELD_TYPES.DATE, _common.KBN_FIELD_TYPES.HISTOGRAM],
    write: function write(agg, output) {
      output.params.field = agg.getParam('field').name;
      output.params.percents = [50];
    }
  }],
  getValue: function getValue(agg, bucket) {
    return bucket[agg.id].values['50.0'];
  }
});
exports.medianMetricAgg = medianMetricAgg;