"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateQuery = decorateQuery;

var _lodash = require("lodash");

var _utils = require("../utils");

var _es_query_dsl = require("./es_query_dsl");

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
 * Decorate queries with default parameters
 * @param query object
 * @param queryStringOptions query:queryString:options from UI settings
 * @param dateFormatTZ dateFormat:tz from UI settings
 * @returns {object}
 */
function decorateQuery(query, queryStringOptions, dateFormatTZ) {
  if ((0, _es_query_dsl.isEsQueryString)(query)) {
    (0, _lodash.extend)(query.query_string, queryStringOptions);

    if (dateFormatTZ) {
      (0, _lodash.defaults)(query.query_string, {
        time_zone: (0, _utils.getTimeZoneFromSettings)(dateFormatTZ)
      });
    }
  }

  return query;
}