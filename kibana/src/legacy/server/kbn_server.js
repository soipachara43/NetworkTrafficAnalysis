"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _cluster = require("cluster");

var _utils = require("../../core/server/utils");

var _config = require("./config");

var _configuration = _interopRequireDefault(require("./logging/configuration"));

var _http = _interopRequireDefault(require("./http"));

var _core = require("./core");

var _logging = require("./logging");

var _warnings = _interopRequireDefault(require("./warnings"));

var _status = require("./status");

var _pid = _interopRequireDefault(require("./pid"));

var _complete = _interopRequireDefault(require("./config/complete"));

var _optimize = _interopRequireDefault(require("../../optimize"));

var Plugins = _interopRequireWildcard(require("./plugins"));

var _index_patterns = require("./index_patterns");

var _saved_objects_mixin = require("./saved_objects/saved_objects_mixin");

var _capabilities = require("./capabilities");

var _server_extensions = require("./server_extensions");

var _ui = require("../ui");

var _sass = require("./sass");

var _i18n = require("./i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths

/**
 * @typedef {import('./kbn_server').KibanaConfig} KibanaConfig
 * @typedef {import('./kbn_server').KibanaCore} KibanaCore
 * @typedef {import('./kbn_server').LegacyPlugins} LegacyPlugins
 */
const rootDir = (0, _utils.fromRoot)('.');

class KbnServer {
  /**
   * @param {Record<string, any>} settings
   * @param {KibanaConfig} config
   * @param {KibanaCore} core
   * @param {LegacyPlugins} legacyPlugins
   */
  constructor(settings, config, core, legacyPlugins) {
    this.name = _utils.pkg.name;
    this.version = _utils.pkg.version;
    this.build = _utils.pkg.build || false;
    this.rootDir = rootDir;
    this.settings = settings || {};
    this.config = config;
    const {
      setupDeps,
      startDeps,
      logger,
      __internals,
      env
    } = core;
    this.server = __internals.hapiServer;
    this.newPlatform = {
      env: {
        mode: env.mode,
        packageInfo: env.packageInfo
      },
      __internals,
      coreContext: {
        logger
      },
      setup: setupDeps,
      start: startDeps,
      stop: null
    };
    this.uiExports = legacyPlugins.uiExports;
    this.pluginSpecs = legacyPlugins.pluginSpecs;
    this.disabledPluginSpecs = legacyPlugins.disabledPluginSpecs;
    this.ready = (0, _lodash.constant)(this.mixin(Plugins.waitForInitSetupMixin, // Sets global HTTP behaviors
    _http.default, _core.coreMixin, // adds methods for extending this.server
    _server_extensions.serverExtensionsMixin, _logging.loggingMixin, _warnings.default, _status.statusMixin, // writes pid file
    _pid.default, // scan translations dirs, register locale files and initialize i18n engine.
    _i18n.i18nMixin, // find plugins and set this.plugins and this.pluginSpecs
    Plugins.scanMixin, // tell the config we are done loading plugins
    _complete.default, // setup this.uiBundles
    _ui.uiMixin, _index_patterns.indexPatternsMixin, // setup saved object routes
    _saved_objects_mixin.savedObjectsMixin, // setup capabilities routes
    _capabilities.capabilitiesMixin, // ensure that all bundles are built, or that the
    // watch bundle server is running
    _optimize.default, // transpiles SCSS into CSS
    _sass.sassMixin, // initialize the plugins
    Plugins.initializeMixin, // notify any deferred setup logic that plugins have initialized
    Plugins.waitForInitResolveMixin));
    this.listen = (0, _lodash.once)(this.listen);
  }
  /**
   * Extend the KbnServer outside of the constraints of a plugin. This allows access
   * to APIs that are not exposed (intentionally) to the plugins and should only
   * be used when the code will be kept up to date with Kibana.
   *
   * @param {...function} - functions that should be called to mixin functionality.
   *                         They are called with the arguments (kibana, server, config)
   *                         and can return a promise to delay execution of the next mixin
   * @return {Promise} - promise that is resolved when the final mixin completes.
   */


  async mixin(...fns) {
    for (const fn of (0, _lodash.compact)((0, _lodash.flatten)(fns))) {
      await fn.call(this, this, this.server, this.config);
    }
  }
  /**
   * Tell the server to listen for incoming requests, or get
   * a promise that will be resolved once the server is listening.
   *
   * @return undefined
   */


  async listen() {
    await this.ready();
    const {
      server,
      config
    } = this;

    if (_cluster.isWorker) {
      // help parent process know when we are ready
      process.send(['WORKER_LISTENING']);
    }

    server.log(['listening', 'info'], `Server running at ${server.info.uri}${config.get('server.rewriteBasePath') ? config.get('server.basePath') : ''}`);
    return server;
  }

  async close() {
    if (!this.server) {
      return;
    }

    await this.server.stop();
  }

  async inject(opts) {
    if (!this.server) {
      await this.ready();
    }

    return await this.server.inject(opts);
  }

  applyLoggingConfiguration(settings) {
    const config = _config.Config.withDefaultSchema(settings);

    const loggingOptions = (0, _configuration.default)(config);
    const subset = {
      ops: config.get('ops'),
      logging: config.get('logging')
    };
    const plain = JSON.stringify(subset, null, 2);
    this.server.log(['info', 'config'], 'New logging configuration:\n' + plain);
    this.server.plugins['@elastic/good'].reconfigure(loggingOptions);
  }

}

exports.default = KbnServer;
module.exports = exports.default;