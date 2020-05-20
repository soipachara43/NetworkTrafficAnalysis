"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siblingPipelineType = exports.siblingPipelineAggHelper = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _sibling_pipeline_agg_writer = require("./sibling_pipeline_agg_writer");

var _nested_agg_helpers = require("./nested_agg_helpers");

var _common = require("../../../../../common");

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
var metricAggFilter = ['!top_hits', '!percentiles', '!percentile_ranks', '!median', '!std_dev', '!sum_bucket', '!avg_bucket', '!min_bucket', '!max_bucket', '!derivative', '!moving_avg', '!serial_diff', '!cumulative_sum', '!geo_bounds', '!geo_centroid'];
var bucketAggFilter = [];

var siblingPipelineType = _i18n.i18n.translate('data.search.aggs.metrics.siblingPipelineAggregationsSubtypeTitle', {
  defaultMessage: 'Sibling pipeline aggregations'
});

exports.siblingPipelineType = siblingPipelineType;
var siblingPipelineAggHelper = {
  subtype: siblingPipelineType,
  params: function params() {
    return [{
      name: 'customBucket',
      type: 'agg',
      allowedAggs: bucketAggFilter,
      default: null,
      makeAgg: function makeAgg(agg, state) {
        state = state || {
          type: 'date_histogram'
        };
        var orderAgg = agg.aggConfigs.createAggConfig(state, {
          addToAggConfigs: false
        });
        orderAgg.id = agg.id + '-bucket';
        return orderAgg;
      },
      modifyAggConfigOnSearchRequestStart: (0, _nested_agg_helpers.forwardModifyAggConfigOnSearchRequestStart)('customBucket'),
      write: function write() {}
    }, {
      name: 'customMetric',
      type: 'agg',
      allowedAggs: metricAggFilter,
      default: null,
      makeAgg: function makeAgg(agg, state) {
        state = state || {
          type: 'count'
        };
        var orderAgg = agg.aggConfigs.createAggConfig(state, {
          addToAggConfigs: false
        });
        orderAgg.id = agg.id + '-metric';
        return orderAgg;
      },
      modifyAggConfigOnSearchRequestStart: (0, _nested_agg_helpers.forwardModifyAggConfigOnSearchRequestStart)('customMetric'),
      write: _sibling_pipeline_agg_writer.siblingPipelineAggWriter
    }];
  },
  getFormat: function getFormat(agg) {
    var customMetric = agg.getParam('customMetric');
    return customMetric ? customMetric.type.getFormat(customMetric) : new (_common.FieldFormat.from(_lodash.identity))();
  }
};
exports.siblingPipelineAggHelper = siblingPipelineAggHelper;