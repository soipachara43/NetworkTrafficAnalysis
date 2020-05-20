"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggTypeFieldFilters = exports.aggTypeFieldFilters = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

/**
 * A registry to store {@link AggTypeFieldFilter} which are used to filter down
 * available fields for a specific visualization and {@link AggType}.
 */
var AggTypeFieldFilters =
/*#__PURE__*/
function () {
  function AggTypeFieldFilters() {
    _classCallCheck(this, AggTypeFieldFilters);

    _defineProperty(this, "filters", new Set());
  }

  _createClass(AggTypeFieldFilters, [{
    key: "addFilter",

    /**
     * Register a new {@link AggTypeFieldFilter} with this registry.
     * This will be used by the {@link #filter|filter method}.
     *
     * @param filter The filter to register.
     */
    value: function addFilter(filter) {
      this.filters.add(filter);
    }
    /**
     * Returns the {@link any|fields} filtered by all registered filters.
     *
     * @param fields An array of fields that will be filtered down by this registry.
     * @param aggConfig The aggConfig for which the returning list will be used.
     * @return A filtered list of the passed fields.
     */

  }, {
    key: "filter",
    value: function filter(fields, aggConfig) {
      var allFilters = Array.from(this.filters);
      var allowedAggTypeFields = fields.filter(function (field) {
        var isAggTypeFieldAllowed = allFilters.every(function (filter) {
          return filter(field, aggConfig);
        });
        return isAggTypeFieldAllowed;
      });
      return allowedAggTypeFields;
    }
  }]);

  return AggTypeFieldFilters;
}();

exports.AggTypeFieldFilters = AggTypeFieldFilters;
var aggTypeFieldFilters = new AggTypeFieldFilters();
exports.aggTypeFieldFilters = aggTypeFieldFilters;