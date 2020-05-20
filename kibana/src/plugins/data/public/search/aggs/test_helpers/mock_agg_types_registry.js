"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockAggTypesRegistry = mockAggTypesRegistry;

var _mocks = require("../../../../../../../src/core/public/mocks");

var _agg_types_registry = require("../agg_types_registry");

var _agg_types = require("../agg_types");

var _bucket_agg_type = require("../buckets/_bucket_agg_type");

var _metric_agg_type = require("../metrics/metric_agg_type");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths

/**
 * Testing utility which creates a new instance of AggTypesRegistry,
 * registers the provided agg types, and returns AggTypesRegistry.start()
 *
 * This is useful if your test depends on a certain agg type to be present
 * in the registry.
 *
 * @param [types] - Optional array of AggTypes to register.
 * If no value is provided, all default types will be registered.
 *
 * @internal
 */
function mockAggTypesRegistry(types) {
  var registry = new _agg_types_registry.AggTypesRegistry();
  var registrySetup = registry.setup();

  if (types) {
    types.forEach(function (type) {
      if (type instanceof _bucket_agg_type.BucketAggType) {
        registrySetup.registerBucket(type);
      } else if (type instanceof _metric_agg_type.MetricAggType) {
        registrySetup.registerMetric(type);
      }
    });
  } else {
    var aggTypes = (0, _agg_types.getAggTypes)({
      uiSettings: _mocks.coreMock.createSetup().uiSettings
    });
    aggTypes.buckets.forEach(function (type) {
      return registrySetup.registerBucket(type);
    });
    aggTypes.metrics.forEach(function (type) {
      return registrySetup.registerMetric(type);
    });
  }

  return registry.start();
}