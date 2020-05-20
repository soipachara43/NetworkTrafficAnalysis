"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportApplicationUsage = reportApplicationUsage;

var _operators = require("rxjs/operators");

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
 * List of appIds not to report usage from (due to legacy hacks)
 */
var DO_NOT_REPORT = ['kibana'];

function reportApplicationUsage(currentAppId$, reporter) {
  currentAppId$.pipe((0, _operators.filter)(function (appId) {
    return typeof appId === 'string' && !DO_NOT_REPORT.includes(appId);
  }), (0, _operators.distinctUntilChanged)()).subscribe(function (appId) {
    return appId && reporter.reportApplicationUsage(appId);
  });
}