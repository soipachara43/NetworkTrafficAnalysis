"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitByFilters = splitByFilters;

var _helpers = require("../../helpers");

var _server = require("../../../../../../data/server");

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
function splitByFilters(req, panel, series, esQueryConfig, indexPattern) {
  return next => doc => {
    if (series.split_mode === 'filters' && series.split_filters) {
      series.split_filters.forEach(filter => {
        const builtEsQuery = _server.esQuery.buildEsQuery(indexPattern, [filter.filter], [], esQueryConfig);

        (0, _helpers.overwrite)(doc, `aggs.${series.id}.filters.filters.${filter.id}`, builtEsQuery);
      });
    }

    return next(doc);
  };
}