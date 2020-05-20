"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggTypesRegistry = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var AggTypesRegistry = function AggTypesRegistry() {
  var _this = this;

  _classCallCheck(this, AggTypesRegistry);

  _defineProperty(this, "bucketAggs", new Map());

  _defineProperty(this, "metricAggs", new Map());

  _defineProperty(this, "setup", function () {
    return {
      registerBucket: function registerBucket(type) {
        var name = type.name;

        if (_this.bucketAggs.get(name)) {
          throw new Error("Bucket agg has already been registered with name: ".concat(name));
        }

        _this.bucketAggs.set(name, type);
      },
      registerMetric: function registerMetric(type) {
        var name = type.name;

        if (_this.metricAggs.get(name)) {
          throw new Error("Metric agg has already been registered with name: ".concat(name));
        }

        _this.metricAggs.set(name, type);
      }
    };
  });

  _defineProperty(this, "start", function () {
    return {
      get: function get(name) {
        return _this.bucketAggs.get(name) || _this.metricAggs.get(name);
      },
      getBuckets: function getBuckets() {
        return Array.from(_this.bucketAggs.values());
      },
      getMetrics: function getMetrics() {
        return Array.from(_this.metricAggs.values());
      },
      getAll: function getAll() {
        return {
          buckets: Array.from(_this.bucketAggs.values()),
          metrics: Array.from(_this.metricAggs.values())
        };
      }
    };
  });
};

exports.AggTypesRegistry = AggTypesRegistry;