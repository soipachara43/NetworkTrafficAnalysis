"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OsMetricsCollector = void 0;

var _os = _interopRequireDefault(require("os"));

var _getos = _interopRequireDefault(require("getos"));

var _util = require("util");

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
const getos = (0, _util.promisify)(_getos.default);

class OsMetricsCollector {
  async collect() {
    const platform = _os.default.platform();

    const load = _os.default.loadavg();

    const metrics = {
      platform,
      platformRelease: `${platform}-${_os.default.release()}`,
      load: {
        '1m': load[0],
        '5m': load[1],
        '15m': load[2]
      },
      memory: {
        total_in_bytes: _os.default.totalmem(),
        free_in_bytes: _os.default.freemem(),
        used_in_bytes: _os.default.totalmem() - _os.default.freemem()
      },
      uptime_in_millis: _os.default.uptime() * 1000
    };

    if (platform === 'linux') {
      try {
        const distro = await getos();
        metrics.distro = distro.dist;
        metrics.distroRelease = `${distro.dist}-${distro.release}`;
      } catch (e) {// ignore errors
      }
    }

    return metrics;
  }

  reset() {}

}

exports.OsMetricsCollector = OsMetricsCollector;