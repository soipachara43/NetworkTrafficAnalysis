"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConversion = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _log_level = require("../../log_level");

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
const LEVEL_COLORS = new Map([[_log_level.LogLevel.Fatal, _chalk.default.red], [_log_level.LogLevel.Error, _chalk.default.red], [_log_level.LogLevel.Warn, _chalk.default.yellow], [_log_level.LogLevel.Debug, _chalk.default.green], [_log_level.LogLevel.Trace, _chalk.default.blue]]);
const LevelConversion = {
  pattern: /%level/g,

  convert(record, highlight) {
    let message = record.level.id.toUpperCase().padEnd(5);

    if (highlight && LEVEL_COLORS.has(record.level)) {
      const color = LEVEL_COLORS.get(record.level);
      message = color(message);
    }

    return message;
  }

};
exports.LevelConversion = LevelConversion;