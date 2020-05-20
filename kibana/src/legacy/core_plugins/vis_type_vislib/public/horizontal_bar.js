"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHorizontalBarVisTypeDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _services = require("@elastic/eui/lib/services");

var _public = require("../../../../plugins/data/public");

var _public2 = require("../../vis_default_editor/public");

var _collections = require("./utils/collections");

var _common_config = require("./utils/common_config");

var _vis_controller = require("./vis_controller");

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
// @ts-ignore
var createHorizontalBarVisTypeDefinition = function createHorizontalBarVisTypeDefinition(deps) {
  return {
    name: 'horizontal_bar',
    title: _i18n.i18n.translate('visTypeVislib.horizontalBar.horizontalBarTitle', {
      defaultMessage: 'Horizontal Bar'
    }),
    icon: 'visBarHorizontal',
    description: _i18n.i18n.translate('visTypeVislib.horizontalBar.horizontalBarDescription', {
      defaultMessage: 'Assign a continuous variable to each axis'
    }),
    visualization: (0, _vis_controller.createVislibVisController)(deps),
    visConfig: {
      defaults: {
        type: 'histogram',
        grid: {
          categoryLines: false
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: _collections.AxisTypes.CATEGORY,
          position: _collections.Positions.LEFT,
          show: true,
          style: {},
          scale: {
            type: _collections.ScaleTypes.LINEAR
          },
          labels: {
            show: true,
            rotate: _collections.Rotates.HORIZONTAL,
            filter: false,
            truncate: 200
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: _collections.AxisTypes.VALUE,
          position: _collections.Positions.BOTTOM,
          show: true,
          style: {},
          scale: {
            type: _collections.ScaleTypes.LINEAR,
            mode: _collections.AxisModes.NORMAL
          },
          labels: {
            show: true,
            rotate: _collections.Rotates.ANGLED,
            filter: true,
            truncate: 100
          },
          title: {
            text: _common_config.countLabel
          }
        }],
        seriesParams: [{
          show: true,
          type: _collections.ChartTypes.HISTOGRAM,
          mode: _collections.ChartModes.NORMAL,
          data: {
            label: _common_config.countLabel,
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: _collections.Positions.RIGHT,
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: _collections.ThresholdLineStyles.FULL,
          color: (0, _services.euiPaletteColorBlind)()[9]
        }
      }
    },
    events: {
      brush: {
        disabled: false
      }
    },
    editorConfig: {
      collections: (0, _collections.getConfigCollections)(),
      optionTabs: (0, _common_config.getAreaOptionTabs)(),
      schemas: new _public2.Schemas([{
        group: _public.AggGroupNames.Metrics,
        name: 'metric',
        title: _i18n.i18n.translate('visTypeVislib.horizontalBar.metricTitle', {
          defaultMessage: 'Y-axis'
        }),
        min: 1,
        aggFilter: ['!geo_centroid', '!geo_bounds'],
        defaults: [{
          schema: 'metric',
          type: 'count'
        }]
      }, {
        group: _public.AggGroupNames.Metrics,
        name: 'radius',
        title: _i18n.i18n.translate('visTypeVislib.horizontalBar.radiusTitle', {
          defaultMessage: 'Dot size'
        }),
        min: 0,
        max: 1,
        aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality']
      }, {
        group: _public.AggGroupNames.Buckets,
        name: 'segment',
        title: _i18n.i18n.translate('visTypeVislib.horizontalBar.segmentTitle', {
          defaultMessage: 'X-axis'
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }, {
        group: _public.AggGroupNames.Buckets,
        name: 'group',
        title: _i18n.i18n.translate('visTypeVislib.horizontalBar.groupTitle', {
          defaultMessage: 'Split series'
        }),
        min: 0,
        max: 3,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }, {
        group: _public.AggGroupNames.Buckets,
        name: 'split',
        title: _i18n.i18n.translate('visTypeVislib.horizontalBar.splitTitle', {
          defaultMessage: 'Split chart'
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }])
    }
  };
};

exports.createHorizontalBarVisTypeDefinition = createHorizontalBarVisTypeDefinition;