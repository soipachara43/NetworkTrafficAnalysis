"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TelemetryPluginsSetup", {
  enumerable: true,
  get: function () {
    return _plugin.TelemetryPluginsSetup;
  }
});
Object.defineProperty(exports, "FetcherTask", {
  enumerable: true,
  get: function () {
    return _fetcher.FetcherTask;
  }
});
Object.defineProperty(exports, "handleOldSettings", {
  enumerable: true,
  get: function () {
    return _handle_old_settings.handleOldSettings;
  }
});
Object.defineProperty(exports, "getClusterUuids", {
  enumerable: true,
  get: function () {
    return _telemetry_collection.getClusterUuids;
  }
});
Object.defineProperty(exports, "getLocalLicense", {
  enumerable: true,
  get: function () {
    return _telemetry_collection.getLocalLicense;
  }
});
Object.defineProperty(exports, "getLocalStats", {
  enumerable: true,
  get: function () {
    return _telemetry_collection.getLocalStats;
  }
});
Object.defineProperty(exports, "TelemetryLocalStats", {
  enumerable: true,
  get: function () {
    return _telemetry_collection.TelemetryLocalStats;
  }
});
exports.constants = exports.plugin = exports.config = void 0;

var _plugin = require("./plugin");

var constants = _interopRequireWildcard(require("../common/constants"));

exports.constants = constants;

var _config = require("./config");

var _fetcher = require("./fetcher");

var _handle_old_settings = require("./handle_old_settings");

var _telemetry_collection = require("./telemetry_collection");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
  schema: _config.configSchema,
  exposeToBrowser: {
    enabled: true,
    url: true,
    banner: true,
    allowChangingOptInStatus: true,
    optIn: true,
    optInStatusUrl: true,
    sendUsageFrom: true
  }
};
exports.config = config;

const plugin = initializerContext => new _plugin.TelemetryPlugin(initializerContext);

exports.plugin = plugin;