"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetricVisTypeDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _metric_vis_component = require("./components/metric_vis_component");

var _metric_vis_options = require("./components/metric_vis_options");

var _public = require("../../vis_type_vislib/public");

var _public2 = require("../../../../plugins/charts/public");

var _public3 = require("../../../../plugins/data/public");

var _public4 = require("../../vis_default_editor/public");

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
var createMetricVisTypeDefinition = function createMetricVisTypeDefinition() {
  return {
    name: 'metric',
    title: _i18n.i18n.translate('visTypeMetric.metricTitle', {
      defaultMessage: 'Metric'
    }),
    icon: 'visMetric',
    description: _i18n.i18n.translate('visTypeMetric.metricDescription', {
      defaultMessage: 'Display a calculation as a single number'
    }),
    visConfig: {
      component: _metric_vis_component.MetricVisComponent,
      defaults: {
        addTooltip: true,
        addLegend: false,
        type: 'metric',
        metric: {
          percentageMode: false,
          useRanges: false,
          colorSchema: _public2.ColorSchemas.GreenToRed,
          metricColorMode: _public.ColorModes.NONE,
          colorsRange: [{
            from: 0,
            to: 10000
          }],
          labels: {
            show: true
          },
          invertColors: false,
          style: {
            bgFill: '#000',
            bgColor: false,
            labelColor: false,
            subText: '',
            fontSize: 60
          }
        }
      }
    },
    editorConfig: {
      collections: {
        metricColorMode: [{
          id: _public.ColorModes.NONE,
          label: _i18n.i18n.translate('visTypeMetric.colorModes.noneOptionLabel', {
            defaultMessage: 'None'
          })
        }, {
          id: _public.ColorModes.LABELS,
          label: _i18n.i18n.translate('visTypeMetric.colorModes.labelsOptionLabel', {
            defaultMessage: 'Labels'
          })
        }, {
          id: _public.ColorModes.BACKGROUND,
          label: _i18n.i18n.translate('visTypeMetric.colorModes.backgroundOptionLabel', {
            defaultMessage: 'Background'
          })
        }],
        colorSchemas: _public2.colorSchemas
      },
      optionsTemplate: _metric_vis_options.MetricVisOptions,
      schemas: new _public4.Schemas([{
        group: _public3.AggGroupNames.Metrics,
        name: 'metric',
        title: _i18n.i18n.translate('visTypeMetric.schemas.metricTitle', {
          defaultMessage: 'Metric'
        }),
        min: 1,
        aggFilter: ['!std_dev', '!geo_centroid', '!derivative', '!serial_diff', '!moving_avg', '!cumulative_sum', '!geo_bounds'],
        aggSettings: {
          top_hits: {
            allowStrings: true
          }
        },
        defaults: [{
          type: 'count',
          schema: 'metric'
        }]
      }, {
        group: _public3.AggGroupNames.Buckets,
        name: 'group',
        title: _i18n.i18n.translate('visTypeMetric.schemas.splitGroupTitle', {
          defaultMessage: 'Split group'
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }])
    }
  };
};

exports.createMetricVisTypeDefinition = createMetricVisTypeDefinition;