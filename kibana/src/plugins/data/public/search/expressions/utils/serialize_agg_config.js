"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserializeAggConfig = exports.serializeAggConfig = void 0;

var _services = require("../../../../public/services");

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

/** @internal */
var serializeAggConfig = function serializeAggConfig(aggConfig) {
  return {
    type: aggConfig.type.name,
    indexPatternId: aggConfig.getIndexPattern().id,
    aggConfigParams: aggConfig.toJSON().params
  };
};

exports.serializeAggConfig = serializeAggConfig;

/** @internal */
var deserializeAggConfig = function deserializeAggConfig(_ref) {
  var type = _ref.type,
      aggConfigParams = _ref.aggConfigParams,
      indexPattern = _ref.indexPattern;

  var _getSearchService = (0, _services.getSearchService)(),
      aggs = _getSearchService.aggs;

  var aggConfigs = aggs.createAggConfigs(indexPattern);
  var aggConfig = aggConfigs.createAggConfig({
    enabled: true,
    type: type,
    params: aggConfigParams
  });
  return aggConfig;
};

exports.deserializeAggConfig = deserializeAggConfig;