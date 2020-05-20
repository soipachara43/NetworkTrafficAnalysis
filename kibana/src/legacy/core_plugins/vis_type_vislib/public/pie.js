"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPieVisTypeDefinition = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../plugins/data/public");

var _public2 = require("../../vis_default_editor/public");

var _options = require("./components/options");

var _collections = require("./utils/collections");

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
var createPieVisTypeDefinition = function createPieVisTypeDefinition(deps) {
  return {
    name: 'pie',
    title: _i18n.i18n.translate('visTypeVislib.pie.pieTitle', {
      defaultMessage: 'Pie'
    }),
    icon: 'visPie',
    description: _i18n.i18n.translate('visTypeVislib.pie.pieDescription', {
      defaultMessage: 'Compare parts of a whole'
    }),
    visualization: (0, _vis_controller.createVislibVisController)(deps),
    visConfig: {
      defaults: {
        type: 'pie',
        addTooltip: true,
        addLegend: true,
        legendPosition: _collections.Positions.RIGHT,
        isDonut: true,
        labels: {
          show: false,
          values: true,
          last_level: true,
          truncate: 100
        }
      }
    },
    editorConfig: {
      collections: {
        legendPositions: (0, _collections.getPositions)()
      },
      optionsTemplate: _options.PieOptions,
      schemas: new _public2.Schemas([{
        group: _public.AggGroupNames.Metrics,
        name: 'metric',
        title: _i18n.i18n.translate('visTypeVislib.pie.metricTitle', {
          defaultMessage: 'Slice size'
        }),
        min: 1,
        max: 1,
        aggFilter: ['sum', 'count', 'cardinality', 'top_hits'],
        defaults: [{
          schema: 'metric',
          type: 'count'
        }]
      }, {
        group: _public.AggGroupNames.Buckets,
        name: 'segment',
        title: _i18n.i18n.translate('visTypeVislib.pie.segmentTitle', {
          defaultMessage: 'Split slices'
        }),
        min: 0,
        max: Infinity,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }, {
        group: _public.AggGroupNames.Buckets,
        name: 'split',
        title: _i18n.i18n.translate('visTypeVislib.pie.splitTitle', {
          defaultMessage: 'Split chart'
        }),
        mustBeFirst: true,
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter']
      }])
    },
    hierarchicalData: true,
    responseHandler: 'vislib_slices'
  };
};

exports.createPieVisTypeDefinition = createPieVisTypeDefinition;