"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.percentileRanksMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _get_response_agg_config_class = require("./lib/get_response_agg_config_class");

var _percentiles_get_value = require("./percentiles_get_value");

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
var valueProps = {
  makeLabel: function makeLabel() {
    var fieldFormatsService = (0, _services.getFieldFormats)();
    var field = this.getField();
    var format = field && field.format || fieldFormatsService.getDefaultInstance(_common.KBN_FIELD_TYPES.NUMBER);
    var customLabel = this.getParam('customLabel');
    var label = customLabel || this.getFieldDisplayName();
    return _i18n.i18n.translate('data.search.aggs.metrics.percentileRanks.valuePropsLabel', {
      defaultMessage: 'Percentile rank {format} of "{label}"',
      values: {
        format: format.convert(this.key, 'text'),
        label: label
      }
    });
  }
};
var percentileRanksMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.PERCENTILE_RANKS,
  title: _i18n.i18n.translate('data.search.aggs.metrics.percentileRanksTitle', {
    defaultMessage: 'Percentile Ranks'
  }),
  makeLabel: function makeLabel(agg) {
    return _i18n.i18n.translate('data.search.aggs.metrics.percentileRanksLabel', {
      defaultMessage: 'Percentile ranks of {field}',
      values: {
        field: agg.getFieldDisplayName()
      }
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: [_common.KBN_FIELD_TYPES.NUMBER, _common.KBN_FIELD_TYPES.HISTOGRAM]
  }, {
    name: 'values',
    default: []
  }, {
    write: function write(agg, output) {
      output.params.keyed = false;
    }
  }],
  getResponseAggs: function getResponseAggs(agg) {
    var ValueAggConfig = (0, _get_response_agg_config_class.getResponseAggConfigClass)(agg, valueProps);
    var values = agg.getParam('values');
    return values.map(function (value) {
      return new ValueAggConfig(value);
    });
  },
  getFormat: function getFormat() {
    var fieldFormatsService = (0, _services.getFieldFormats)();
    return fieldFormatsService.getInstance(_common.FIELD_FORMAT_IDS.PERCENT) || fieldFormatsService.getDefaultInstance(_common.KBN_FIELD_TYPES.NUMBER);
  },
  getValue: function getValue(agg, bucket) {
    return (0, _percentiles_get_value.getPercentileValue)(agg, bucket) / 100;
  }
});
exports.percentileRanksMetricAgg = percentileRanksMetricAgg;