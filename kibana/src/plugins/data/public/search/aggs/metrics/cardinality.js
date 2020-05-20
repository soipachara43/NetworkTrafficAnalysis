"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardinalityMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _metric_agg_types = require("./metric_agg_types");

var _common = require("../../../../common");

var _services = require("../../../../public/services");

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
var uniqueCountTitle = _i18n.i18n.translate('data.search.aggs.metrics.uniqueCountTitle', {
  defaultMessage: 'Unique Count'
});

var cardinalityMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.CARDINALITY,
  title: uniqueCountTitle,
  makeLabel: function makeLabel(aggConfig) {
    return _i18n.i18n.translate('data.search.aggs.metrics.uniqueCountLabel', {
      defaultMessage: 'Unique count of {field}',
      values: {
        field: aggConfig.getFieldDisplayName()
      }
    });
  },
  getFormat: function getFormat() {
    var fieldFormatsService = (0, _services.getFieldFormats)();
    return fieldFormatsService.getDefaultInstance(_common.KBN_FIELD_TYPES.NUMBER);
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: Object.values(_common.KBN_FIELD_TYPES).filter(function (type) {
      return type !== _common.KBN_FIELD_TYPES.HISTOGRAM;
    })
  }]
});
exports.cardinalityMetricAgg = cardinalityMetricAgg;