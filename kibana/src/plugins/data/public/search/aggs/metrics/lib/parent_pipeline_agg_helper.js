"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parentPipelineType = exports.parentPipelineAggHelper = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _nested_agg_helpers = require("./nested_agg_helpers");

var _parent_pipeline_agg_writer = require("./parent_pipeline_agg_writer");

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
var metricAggFilter = ['!top_hits', '!percentiles', '!percentile_ranks', '!median', '!std_dev', '!geo_bounds', '!geo_centroid'];

var parentPipelineType = _i18n.i18n.translate('data.search.aggs.metrics.parentPipelineAggregationsSubtypeTitle', {
  defaultMessage: 'Parent Pipeline Aggregations'
});

exports.parentPipelineType = parentPipelineType;
var parentPipelineAggHelper = {
  subtype: parentPipelineType,
  params: function params() {
    return [{
      name: 'metricAgg',
      default: 'custom',
      write: _parent_pipeline_agg_writer.parentPipelineAggWriter
    }, {
      name: 'customMetric',
      type: 'agg',
      allowedAggs: metricAggFilter,
      makeAgg: function makeAgg(termsAgg, state) {
        state = state || {
          type: 'count'
        };
        var metricAgg = termsAgg.aggConfigs.createAggConfig(state, {
          addToAggConfigs: false
        });
        metricAgg.id = termsAgg.id + '-metric';
        return metricAgg;
      },
      modifyAggConfigOnSearchRequestStart: (0, _nested_agg_helpers.forwardModifyAggConfigOnSearchRequestStart)('customMetric'),
      write: _lodash.noop
    }, {
      name: 'buckets_path',
      write: _lodash.noop
    }];
  },
  getFormat: function getFormat(agg) {
    var subAgg;
    var customMetric = agg.getParam('customMetric');

    if (customMetric) {
      subAgg = customMetric;
    } else {
      subAgg = agg.aggConfigs.byId(agg.getParam('metricAgg'));
    }

    return subAgg ? subAgg.type.getFormat(subAgg) : new (_common.FieldFormat.from(_lodash.identity))();
  }
};
exports.parentPipelineAggHelper = parentPipelineAggHelper;