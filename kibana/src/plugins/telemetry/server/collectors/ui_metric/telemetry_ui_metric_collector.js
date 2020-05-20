"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUiMetricUsageCollector = registerUiMetricUsageCollector;

var _constants = require("../../../common/constants");

var _find_all = require("../find_all");

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
function registerUiMetricUsageCollector(usageCollection, registerType, getSavedObjectsClient) {
  registerType({
    name: 'ui-metric',
    hidden: false,
    namespaceAgnostic: true,
    mappings: {
      properties: {
        count: {
          type: 'integer'
        }
      }
    }
  });
  const collector = usageCollection.makeUsageCollector({
    type: _constants.UI_METRIC_USAGE_TYPE,
    fetch: async () => {
      const savedObjectsClient = getSavedObjectsClient();

      if (typeof savedObjectsClient === 'undefined') {
        return;
      }

      const rawUiMetrics = await (0, _find_all.findAll)(savedObjectsClient, {
        type: 'ui-metric',
        fields: ['count']
      });
      const uiMetricsByAppName = rawUiMetrics.reduce((accum, rawUiMetric) => {
        const {
          id,
          attributes: {
            count
          }
        } = rawUiMetric;
        const [appName, metricType] = id.split(':');
        const pair = {
          key: metricType,
          value: count
        };
        return { ...accum,
          [appName]: [...(accum[appName] || []), pair]
        };
      }, {});
      return uiMetricsByAppName;
    },
    isReady: () => typeof getSavedObjectsClient() !== 'undefined'
  });
  usageCollection.registerCollector(collector);
}