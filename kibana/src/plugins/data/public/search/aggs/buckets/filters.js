"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFiltersBucketAgg = getFiltersBucketAgg;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _filters = require("./create_filter/filters");

var _utils = require("../utils");

var _bucket_agg_type = require("./_bucket_agg_type");

var _bucket_agg_types = require("./bucket_agg_types");

var _public = require("../../../../../../plugins/kibana_utils/public");

var _common = require("../../../../common");

var _query = require("../../../query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var filtersTitle = _i18n.i18n.translate('data.search.aggs.buckets.filtersTitle', {
  defaultMessage: 'Filters',
  description: 'The name of an aggregation, that allows to specify multiple individual filters to group data by.'
});

function getFiltersBucketAgg(deps) {
  var uiSettings = deps.uiSettings;
  return new _bucket_agg_type.BucketAggType({
    name: _bucket_agg_types.BUCKET_TYPES.FILTERS,
    title: filtersTitle,
    createFilter: _filters.createFilterFilters,
    customLabels: false,
    params: [{
      name: 'filters',
      default: [{
        input: {
          query: '',
          language: uiSettings.get('search:queryLanguage')
        },
        label: ''
      }],
      write: function write(aggConfig, output) {
        var inFilters = aggConfig.params.filters;
        if (!_lodash.default.size(inFilters)) return;
        inFilters.forEach(function (filter) {
          var persistedLog = (0, _query.getQueryLog)(uiSettings, new _public.Storage(window.localStorage), 'vis_default_editor', filter.input.language);
          persistedLog.add(filter.input.query);
        });

        var outFilters = _lodash.default.transform(inFilters, function (filters, filter) {
          var input = _lodash.default.cloneDeep(filter.input);

          if (!input) {
            console.log('malformed filter agg params, missing "input" query'); // eslint-disable-line no-console

            return;
          }

          var esQueryConfigs = (0, _common.getEsQueryConfig)(uiSettings);
          var query = (0, _common.buildEsQuery)(aggConfig.getIndexPattern(), [input], [], esQueryConfigs);

          if (!query) {
            console.log('malformed filter agg params, missing "query" on input'); // eslint-disable-line no-console

            return;
          }

          var matchAllLabel = filter.input.query === '' ? '*' : '';
          var label = filter.label || matchAllLabel || (typeof filter.input.query === 'string' ? filter.input.query : (0, _utils.toAngularJSON)(filter.input.query));
          filters[label] = {
            query: query
          };
        }, {});

        if (!_lodash.default.size(outFilters)) return;
        var params = output.params || (output.params = {});
        params.filters = outFilters;
      }
    }]
  });
}