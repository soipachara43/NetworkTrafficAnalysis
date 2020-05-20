"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metricBuckets = metricBuckets;

var _helpers = require("../../helpers");

var _get_bucket_size = require("../../helpers/get_bucket_size");

var _bucket_transform = require("../../helpers/bucket_transform");

var _get_interval_and_timefield = require("../../get_interval_and_timefield");

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
function metricBuckets(req, panel, series, esQueryConfig, indexPatternObject, capabilities) {
  return next => doc => {
    const {
      interval
    } = (0, _get_interval_and_timefield.getIntervalAndTimefield)(panel, series, indexPatternObject);
    const {
      intervalString
    } = (0, _get_bucket_size.getBucketSize)(req, interval, capabilities);
    series.metrics.filter(row => !/_bucket$/.test(row.type) && !/^series/.test(row.type)).forEach(metric => {
      const fn = _bucket_transform.bucketTransform[metric.type];

      if (fn) {
        try {
          const bucket = fn(metric, series.metrics, intervalString);
          (0, _helpers.overwrite)(doc, `aggs.${series.id}.aggs.timeseries.aggs.${metric.id}`, bucket);
        } catch (e) {// meh
        }
      }
    });
    return next(doc);
  };
}