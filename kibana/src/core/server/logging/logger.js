"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseLogger = void 0;

var _log_level = require("./log_level");

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
function isError(x) {
  return x instanceof Error;
}
/** @internal */


class BaseLogger {
  constructor(context, level, appenders, factory) {
    this.context = context;
    this.level = level;
    this.appenders = appenders;
    this.factory = factory;
  }

  trace(message, meta) {
    this.log(this.createLogRecord(_log_level.LogLevel.Trace, message, meta));
  }

  debug(message, meta) {
    this.log(this.createLogRecord(_log_level.LogLevel.Debug, message, meta));
  }

  info(message, meta) {
    this.log(this.createLogRecord(_log_level.LogLevel.Info, message, meta));
  }

  warn(errorOrMessage, meta) {
    this.log(this.createLogRecord(_log_level.LogLevel.Warn, errorOrMessage, meta));
  }

  error(errorOrMessage, meta) {
    this.log(this.createLogRecord(_log_level.LogLevel.Error, errorOrMessage, meta));
  }

  fatal(errorOrMessage, meta) {
    this.log(this.createLogRecord(_log_level.LogLevel.Fatal, errorOrMessage, meta));
  }

  log(record) {
    if (!this.level.supports(record.level)) {
      return;
    }

    for (const appender of this.appenders) {
      appender.append(record);
    }
  }

  get(...childContextPaths) {
    return this.factory.get(...[this.context, ...childContextPaths]);
  }

  createLogRecord(level, errorOrMessage, meta) {
    if (isError(errorOrMessage)) {
      return {
        context: this.context,
        error: errorOrMessage,
        level,
        message: errorOrMessage.message,
        meta,
        timestamp: new Date(),
        pid: process.pid
      };
    }

    return {
      context: this.context,
      level,
      message: errorOrMessage,
      meta,
      timestamp: new Date(),
      pid: process.pid
    };
  }

}

exports.BaseLogger = BaseLogger;