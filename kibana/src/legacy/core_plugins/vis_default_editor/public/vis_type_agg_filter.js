"use strict";

var _public = require("../../../../plugins/data/public");

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
var _search$aggs = _public.search.aggs,
    aggTypeFilters = _search$aggs.aggTypeFilters,
    propFilter = _search$aggs.propFilter;
var filterByName = propFilter('name');
/**
 * This filter checks the defined aggFilter in the schemas of that visualization
 * and limits available aggregations based on that.
 */

aggTypeFilters.addFilter(function (aggType, indexPatterns, aggConfig, aggFilter) {
  var doesSchemaAllowAggType = filterByName([aggType], aggFilter).length !== 0;
  return doesSchemaAllowAggType;
});