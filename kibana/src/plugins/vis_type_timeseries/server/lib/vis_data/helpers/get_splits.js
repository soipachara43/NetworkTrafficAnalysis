"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSplits = getSplits;

var _color = _interopRequireDefault(require("color"));

var _calculate_label = require("../../../../common/calculate_label");

var _lodash = _interopRequireDefault(require("lodash"));

var _get_last_metric = require("./get_last_metric");

var _get_split_colors = require("./get_split_colors");

var _format_key = require("./format_key");

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
const getTimeSeries = (resp, series) => _lodash.default.get(resp, `aggregations.timeseries`) || _lodash.default.get(resp, `aggregations.${series.id}.timeseries`);

function getSplits(resp, panel, series, meta) {
  if (!meta) {
    meta = _lodash.default.get(resp, `aggregations.${series.id}.meta`);
  }

  const color = new _color.default(series.color);
  const metric = (0, _get_last_metric.getLastMetric)(series);

  const buckets = _lodash.default.get(resp, `aggregations.${series.id}.buckets`);

  if (buckets) {
    if (Array.isArray(buckets)) {
      const size = buckets.length;
      const colors = (0, _get_split_colors.getSplitColors)(series.color, size, series.split_color_mode);
      return buckets.map(bucket => {
        bucket.id = `${series.id}:${bucket.key}`;
        bucket.label = (0, _format_key.formatKey)(bucket.key, series);
        bucket.color = panel.type === 'top_n' ? color.string() : colors.shift();
        bucket.meta = meta;
        return bucket;
      });
    }

    if (series.split_mode === 'filters' && _lodash.default.isPlainObject(buckets)) {
      return series.split_filters.map(filter => {
        const bucket = _lodash.default.get(resp, `aggregations.${series.id}.buckets.${filter.id}`);

        bucket.id = `${series.id}:${filter.id}`;
        bucket.key = filter.id;
        bucket.color = filter.color;
        bucket.label = filter.label || filter.filter.query || '*';
        bucket.meta = meta;
        return bucket;
      });
    }
  }

  const timeseries = getTimeSeries(resp, series);
  const mergeObj = {
    timeseries
  };
  series.metrics.filter(m => /_bucket/.test(m.type)).forEach(m => {
    mergeObj[m.id] = _lodash.default.get(resp, `aggregations.${series.id}.${m.id}`);
  });
  return [{
    id: series.id,
    label: series.label || (0, _calculate_label.calculateLabel)(metric, series.metrics),
    color: color.string(),
    ...mergeObj,
    meta
  }];
}