"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRollupSearchStrategy = void 0;

var _rollup_search_strategy = require("./rollup_search_strategy");

var _rollup_search_request = require("./rollup_search_request");

var _rollup_search_capabilities = require("./rollup_search_capabilities");

var _server = require("../../../../../../../src/plugins/vis_type_timeseries/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const registerRollupSearchStrategy = ({
  elasticsearchService
}, addSearchStrategy) => {
  const RollupSearchRequest = (0, _rollup_search_request.getRollupSearchRequest)(_server.AbstractSearchRequest);
  const RollupSearchCapabilities = (0, _rollup_search_capabilities.getRollupSearchCapabilities)(_server.DefaultSearchCapabilities);
  const RollupSearchStrategy = (0, _rollup_search_strategy.getRollupSearchStrategy)(_server.AbstractSearchStrategy, RollupSearchRequest, RollupSearchCapabilities);
  addSearchStrategy(new RollupSearchStrategy(elasticsearchService));
};

exports.registerRollupSearchStrategy = registerRollupSearchStrategy;