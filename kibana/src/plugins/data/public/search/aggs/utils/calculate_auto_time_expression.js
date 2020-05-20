"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCalculateAutoTimeExpression = getCalculateAutoTimeExpression;

var _time_buckets = require("../buckets/lib/time_buckets");

var _common = require("../../../../common");

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
function getCalculateAutoTimeExpression(uiSettings) {
  return function calculateAutoTimeExpression(range) {
    var dates = (0, _common.toAbsoluteDates)(range);

    if (!dates) {
      return;
    }

    var buckets = new _time_buckets.TimeBuckets({
      uiSettings: uiSettings
    });
    buckets.setInterval('auto');
    buckets.setBounds({
      min: dates.from,
      max: dates.to
    });
    return buckets.getInterval().expression;
  };
}