"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "VisTypeTimeseriesSetup", {
  enumerable: true,
  get: function () {
    return _plugin.VisTypeTimeseriesSetup;
  }
});
Object.defineProperty(exports, "Framework", {
  enumerable: true,
  get: function () {
    return _plugin.Framework;
  }
});
Object.defineProperty(exports, "ValidationTelemetryServiceSetup", {
  enumerable: true,
  get: function () {
    return _validation_telemetry.ValidationTelemetryServiceSetup;
  }
});
Object.defineProperty(exports, "AbstractSearchStrategy", {
  enumerable: true,
  get: function () {
    return _abstract_search_strategy.AbstractSearchStrategy;
  }
});
Object.defineProperty(exports, "AbstractSearchRequest", {
  enumerable: true,
  get: function () {
    return _abstract_request.AbstractSearchRequest;
  }
});
Object.defineProperty(exports, "DefaultSearchCapabilities", {
  enumerable: true,
  get: function () {
    return _default_search_capabilities.DefaultSearchCapabilities;
  }
});
exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

var _plugin = require("./plugin");

var _validation_telemetry = require("./validation_telemetry");

var _abstract_search_strategy = require("./lib/search_strategies/strategies/abstract_search_strategy");

var _abstract_request = require("./lib/search_strategies/search_requests/abstract_request");

var _default_search_capabilities = require("./lib/search_strategies/default_search_capabilities");

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
const config = {
  schema: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    })
  })
};
exports.config = config;

function plugin(initializerContext) {
  return new _plugin.VisTypeTimeseriesPlugin(initializerContext);
}