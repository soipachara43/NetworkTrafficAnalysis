"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processors = void 0;

var _std_metric = require("./std_metric");

var _std_sibling = require("./std_sibling");

var _series_agg = require("./series_agg");

var _percentile = require("./percentile");

var _percentile_rank = require("./percentile_rank");

var _math = require("./math");

var _drop_last_bucket = require("./drop_last_bucket");

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
// import percentile from './percentile';
const processors = [_percentile.percentile, _percentile_rank.percentileRank, _std_metric.stdMetric, _std_sibling.stdSibling, _math.math, _series_agg.seriesAgg, _drop_last_bucket.dropLastBucketFn];
exports.processors = processors;