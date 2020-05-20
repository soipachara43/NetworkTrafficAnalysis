"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGaugeVisTypeDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../vis_default_editor/public");

var _public2 = require("../../../../plugins/data/public");

var _options = require("./components/options");

var _collections = require("./utils/collections");

var _vis_controller = require("./vis_controller");

var _public3 = require("../../../../plugins/charts/public");

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
var createGaugeVisTypeDefinition = function createGaugeVisTypeDefinition(deps) {
  return {
    name: 'gauge',
    title: _i18n.i18n.translate('visTypeVislib.gauge.gaugeTitle', {
      defaultMessage: 'Gauge'
    }),
    icon: 'visGauge',
    description: _i18n.i18n.translate('visTypeVislib.gauge.gaugeDescription', {
      defaultMessage: "Gauges indicate the status of a metric. Use it to show how a metric's value relates to reference threshold values."
    }),
    visConfig: {
      defaults: {
        type: 'gauge',
        addTooltip: true,
        addLegend: true,
        isDisplayWarning: false,
        gauge: {
          alignment: _collections.Alignments.AUTOMATIC,
          extendRange: true,
          percentageMode: false,
          gaugeType: _collections.GaugeTypes.ARC,
          gaugeStyle: 'Full',
          backStyle: 'Full',
          orientation: 'vertical',
          colorSchema: _public3.ColorSchemas.GreenToRed,
          gaugeColorMode: _collections.ColorModes.LABELS,
          colorsRange: [{
            from: 0,
            to: 50
          }, {
            from: 50,
            to: 75
          }, {
            from: 75,
            to: 100
          }],
          invertColors: false,
          labels: {
            show: true,
            color: 'black'
          },
          scale: {
            show: true,
            labels: false,
            color: 'rgba(105,112,125,0.2)'
          },
          type: 'meter',
          style: {
            bgWidth: 0.9,
            width: 0.9,
            mask: false,
            bgMask: false,
            maskBars: 50,
            bgFill: 'rgba(105,112,125,0.2)',
            bgColor: true,
            subText: '',
            fontSize: 60
          }
        }
      }
    },
    visualization: (0, _vis_controller.createVislibVisController)(deps),
    editorConfig: {
      collections: (0, _collections.getGaugeCollections)(),
      optionsTemplate: _options.GaugeOptions,
      schemas: new _public.Schemas([{
        group: _public2.AggGroupNames.Metrics,
        name: 'metric',
        title: _i18n.i18n.translate('visTypeVislib.gauge.metricTitle', {
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
        title: _i18n.i18n.translate('visTypeVislib.gauge.groupTitle', {
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

exports.createGaugeVisTypeDefinition = createGaugeVisTypeDefinition;