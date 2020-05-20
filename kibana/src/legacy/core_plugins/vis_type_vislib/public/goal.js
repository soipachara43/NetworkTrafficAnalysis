"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGoalVisTypeDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _options = require("./components/options");

var _collections = require("./utils/collections");

var _vis_controller = require("./vis_controller");

var _public = require("../../../../plugins/charts/public");

var _public2 = require("../../../../plugins/data/public");

var _public3 = require("../../vis_default_editor/public");

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
var createGoalVisTypeDefinition = function createGoalVisTypeDefinition(deps) {
  return {
    name: 'goal',
    title: _i18n.i18n.translate('visTypeVislib.goal.goalTitle', {
      defaultMessage: 'Goal'
    }),
    icon: 'visGoal',
    description: _i18n.i18n.translate('visTypeVislib.goal.goalDescription', {
      defaultMessage: 'A goal chart indicates how close you are to your final goal.'
    }),
    visualization: (0, _vis_controller.createVislibVisController)(deps),
    visConfig: {
      defaults: {
        addTooltip: true,
        addLegend: false,
        isDisplayWarning: false,
        type: 'gauge',
        gauge: {
          verticalSplit: false,
          autoExtend: false,
          percentageMode: true,
          gaugeType: _collections.GaugeTypes.ARC,
          gaugeStyle: 'Full',
          backStyle: 'Full',
          orientation: 'vertical',
          useRanges: false,
          colorSchema: _public.ColorSchemas.GreenToRed,
          gaugeColorMode: _collections.ColorModes.NONE,
          colorsRange: [{
            from: 0,
            to: 10000
          }],
          invertColors: false,
          labels: {
            show: true,
            color: 'black'
          },
          scale: {
            show: false,
            labels: false,
            color: 'rgba(105,112,125,0.2)',
            width: 2
          },
          type: 'meter',
          style: {
            bgFill: 'rgba(105,112,125,0.2)',
            bgColor: false,
            labelColor: false,
            subText: '',
            fontSize: 60
          }
        }
      }
    },
    editorConfig: {
      collections: (0, _collections.getGaugeCollections)(),
      optionsTemplate: _options.GaugeOptions,
      schemas: new _public3.Schemas([{
        group: _public2.AggGroupNames.Metrics,
        name: 'metric',
        title: _i18n.i18n.translate('visTypeVislib.goal.metricTitle', {
          defaultMessage: 'Metric'
        }),
        min: 1,
        aggFilter: ['!std_dev', '!geo_centroid', '!percentiles', '!percentile_ranks', '!derivative', '!serial_diff', '!moving_avg', '!cumulative_sum', '!geo_bounds'],
        defaults: [{
          schema: 'metric',
          type: 'count'
        }]
      }, {
        group: _public2.AggGroupNames.Buckets,
        name: 'group',
        title: _i18n.i18n.translate('visTypeVislib.goal.groupTitle', {
          defaultMessage: 'Split group'
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }])
    },
    useCustomNoDataScreen: true
  };
};

exports.createGoalVisTypeDefinition = createGoalVisTypeDefinition;