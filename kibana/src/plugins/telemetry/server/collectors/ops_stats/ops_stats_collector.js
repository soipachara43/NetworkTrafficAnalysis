"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOpsStatsCollector = getOpsStatsCollector;
exports.registerOpsStatsCollector = registerOpsStatsCollector;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../../common/constants");

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

/**
 * Initialize a collector for Kibana Ops Stats
 */
function getOpsStatsCollector(usageCollection, metrics$) {
  let lastMetrics = null;
  metrics$.subscribe(_metrics => {
    const metrics = (0, _lodash.cloneDeep)(_metrics); // Ensure we only include the same data that Metricbeat collection would get

    delete metrics.process.pid;
    const responseTimes = {
      average: metrics.response_times.avg_in_millis,
      max: metrics.response_times.max_in_millis
    };
    delete metrics.requests.statusCodes;
    lastMetrics = { ...metrics,
      response_times: responseTimes,
      timestamp: _moment.default.utc().toISOString()
    };
  });
  return usageCollection.makeStatsCollector({
    type: _constants.KIBANA_STATS_TYPE,
    isReady: () => !!lastMetrics,
    fetch: () => lastMetrics
  });
}

function registerOpsStatsCollector(usageCollection, metrics$) {
  usageCollection.registerCollector(getOpsStatsCollector(usageCollection, metrics$));
}