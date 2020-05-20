"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHeatmapVisTypeDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../vis_default_editor/public");

var _public2 = require("../../../../plugins/data/public");

var _collections = require("./utils/collections");

var _options = require("./components/options");

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
var createHeatmapVisTypeDefinition = function createHeatmapVisTypeDefinition(deps) {
  return {
    name: 'heatmap',
    title: _i18n.i18n.translate('visTypeVislib.heatmap.heatmapTitle', {
      defaultMessage: 'Heat Map'
    }),
    icon: 'heatmap',
    description: _i18n.i18n.translate('visTypeVislib.heatmap.heatmapDescription', {
      defaultMessage: 'Shade cells within a matrix'
    }),
    visualization: (0, _vis_controller.createVislibVisController)(deps),
    visConfig: {
      defaults: {
        type: 'heatmap',
        addTooltip: true,
        addLegend: true,
        enableHover: false,
        legendPosition: _collections.Positions.RIGHT,
        times: [],
        colorsNumber: 4,
        colorSchema: _public3.ColorSchemas.Greens,
        setColorRange: false,
        colorsRange: [],
        invertColors: false,
        percentageMode: false,
        valueAxes: [{
          show: false,
          id: 'ValueAxis-1',
          type: _collections.AxisTypes.VALUE,
          scale: {
            type: _collections.ScaleTypes.LINEAR,
            defaultYExtents: false
          },
          labels: {
            show: false,
            rotate: 0,
            overwriteColor: false,
            color: 'black'
          }
        }]
      }
    },
    events: {
      brush: {
        disabled: false
      }
    },
    editorConfig: {
      collections: (0, _collections.getHeatmapCollections)(),
      optionsTemplate: _options.HeatmapOptions,
      schemas: new _public.Schemas([{
        group: _public2.AggGroupNames.Metrics,
        name: 'metric',
        title: _i18n.i18n.translate('visTypeVislib.heatmap.metricTitle', {
          defaultMessage: 'Value'
        }),
        min: 1,
        max: 1,
        aggFilter: ['count', 'avg', 'median', 'sum', 'min', 'max', 'cardinality', 'std_dev', 'top_hits'],
        defaults: [{
          schema: 'metric',
          type: 'count'
        }]
      }, {
        group: _public2.AggGroupNames.Buckets,
        name: 'segment',
        title: _i18n.i18n.translate('visTypeVislib.heatmap.segmentTitle', {
          defaultMessage: 'X-axis'
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }, {
        group: _public2.AggGroupNames.Buckets,
        name: 'group',
        title: _i18n.i18n.translate('visTypeVislib.heatmap.groupTitle', {
          defaultMessage: 'Y-axis'
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }, {
        group: _public2.AggGroupNames.Buckets,
        name: 'split',
        title: _i18n.i18n.translate('visTypeVislib.heatmap.splitTitle', {
          defaultMessage: 'Split chart'
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }])
    }
  };
};

exports.createHeatmapVisTypeDefinition = createHeatmapVisTypeDefinition;