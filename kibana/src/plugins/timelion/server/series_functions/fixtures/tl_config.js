"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _moment = _interopRequireDefault(require("moment"));

var _sinon = _interopRequireDefault(require("sinon"));

var _get_namespaced_settings = _interopRequireDefault(require("../../lib/get_namespaced_settings"));

var _es_response = _interopRequireDefault(require("./es_response"));

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
function _default() {
  const functions = require('../../lib/load_functions')('series_functions');

  const tlConfig = require('../../handlers/lib/tl_config.js')({
    getFunction: name => {
      if (!functions[name]) throw new Error('No such function: ' + name);
      return functions[name];
    },
    esDataClient: _sinon.default.stub().returns({
      callAsCurrentUser: function () {
        return Promise.resolve(_es_response.default);
      }
    }),
    esShardTimeout: _moment.default.duration(30000),
    allowedGraphiteUrls: ['https://www.hostedgraphite.com/UID/ACCESS_KEY/graphite']
  });

  tlConfig.time = {
    interval: '1y',
    from: (0, _moment.default)('1980-01-01T00:00:00Z').valueOf(),
    to: (0, _moment.default)('1983-01-01T00:00:00Z').valueOf(),
    timezone: 'Etc/UTC'
  };
  tlConfig.settings = (0, _get_namespaced_settings.default)();
  tlConfig.setTargetSeries();
  return tlConfig;
}

module.exports = exports.default;