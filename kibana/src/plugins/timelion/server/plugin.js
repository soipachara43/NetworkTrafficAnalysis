"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _i18n = require("@kbn/i18n");

var _operators = require("rxjs/operators");

var _utils = require("../../../../src/core/utils");

var _load_functions = _interopRequireDefault(require("./lib/load_functions"));

var _functions = require("./routes/functions");

var _validate_es = require("./routes/validate_es");

var _run = require("./routes/run");

var _config_manager = require("./lib/config_manager");

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

/**
 * Represents Timelion Plugin instance that will be managed by the Kibana plugin system.
 */
class Plugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;
  }

  async setup(core) {
    const config = await this.initializerContext.config.create().pipe((0, _operators.first)()).toPromise();
    const configManager = new _config_manager.ConfigManager(this.initializerContext.config);
    const functions = (0, _load_functions.default)('series_functions');

    const getFunction = name => {
      if (functions[name]) {
        return functions[name];
      }

      throw new Error(_i18n.i18n.translate('timelion.noFunctionErrorMessage', {
        defaultMessage: 'No such function: {name}',
        values: {
          name
        }
      }));
    };

    const logger = this.initializerContext.logger.get('timelion');
    const router = core.http.createRouter();
    const deps = {
      configManager,
      functions,
      getFunction,
      logger
    };
    (0, _functions.functionsRoute)(router, deps);
    (0, _run.runRoute)(router, deps);
    (0, _validate_es.validateEsRoute)(router);
    return (0, _utils.deepFreeze)({
      uiEnabled: config.ui.enabled
    });
  }

  start() {
    this.initializerContext.logger.get().debug('Starting plugin');
  }

  stop() {
    this.initializerContext.logger.get().debug('Stopping plugin');
  }

}

exports.Plugin = Plugin;