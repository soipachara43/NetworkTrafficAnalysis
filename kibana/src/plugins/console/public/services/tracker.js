"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUsageTracker = void 0;

var _analytics = require("@kbn/analytics");

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
var APP_TRACKER_NAME = 'console';

var createUsageTracker = function createUsageTracker(usageCollection) {
  var track = function track(type, name) {
    return usageCollection === null || usageCollection === void 0 ? void 0 : usageCollection.reportUiStats(APP_TRACKER_NAME, type, name);
  };

  return {
    count: function count(eventName) {
      track(_analytics.METRIC_TYPE.COUNT, eventName);
    },
    load: function load(eventName) {
      track(_analytics.METRIC_TYPE.LOADED, eventName);
    }
  };
};

exports.createUsageTracker = createUsageTracker;