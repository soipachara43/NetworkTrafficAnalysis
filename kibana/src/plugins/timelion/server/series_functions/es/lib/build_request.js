"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildRequest;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _agg_body = require("./agg_body");

var _create_date_agg = _interopRequireDefault(require("./create_date_agg"));

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
function buildRequest(config, tlConfig, scriptedFields, timeout) {
  const bool = {
    must: []
  };
  const timeFilter = {
    range: {
      [config.timefield]: {
        gte: (0, _moment.default)(tlConfig.time.from).toISOString(),
        lte: (0, _moment.default)(tlConfig.time.to).toISOString(),
        format: 'strict_date_optional_time'
      }
    }
  };
  bool.must.push(timeFilter); // Use the kibana filter bar filters

  if (config.kibana) {
    bool.filter = _lodash.default.get(tlConfig, 'request.payload.extended.es.filter');
  }

  const aggs = {
    q: {
      meta: {
        type: 'split'
      },
      filters: {
        filters: _lodash.default.chain(config.q).map(function (q) {
          return [q, {
            query_string: {
              query: q
            }
          }];
        }).zipObject().value()
      },
      aggs: {}
    }
  };
  let aggCursor = aggs.q.aggs;

  _lodash.default.each(config.split, function (clause) {
    clause = clause.split(':');

    if (clause[0] && clause[1]) {
      const termsAgg = (0, _agg_body.buildAggBody)(clause[0], scriptedFields);
      termsAgg.size = parseInt(clause[1], 10);
      aggCursor[clause[0]] = {
        meta: {
          type: 'split'
        },
        terms: termsAgg,
        aggs: {}
      };
      aggCursor = aggCursor[clause[0]].aggs;
    } else {
      throw new Error('`split` requires field:limit');
    }
  });

  _lodash.default.assign(aggCursor, (0, _create_date_agg.default)(config, tlConfig, scriptedFields));

  const request = {
    index: config.index,
    ignore_throttled: !tlConfig.settings['search:includeFrozen'],
    body: {
      query: {
        bool: bool
      },
      aggs: aggs,
      size: 0
    }
  };

  if (timeout) {
    request.timeout = `${timeout}ms`;
  }

  return request;
}

module.exports = exports.default;