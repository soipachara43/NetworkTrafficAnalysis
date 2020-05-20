"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaBackendFrameworkAdapter = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var _lodash = require("lodash");

var _Either = require("fp-ts/lib/Either");

var _mirror_plugin_status = require("../../../../../../server/lib/mirror_plugin_status");

var _adapter_types = require("./adapter_types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class KibanaBackendFrameworkAdapter {
  constructor(PLUGIN_ID, server, CONFIG_PREFIX) {
    this.PLUGIN_ID = PLUGIN_ID;
    this.server = server;
    this.CONFIG_PREFIX = CONFIG_PREFIX;

    _defineProperty(this, "internalUser", _adapter_types.internalUser);

    _defineProperty(this, "info", null);

    _defineProperty(this, "xpackInfoWasUpdatedHandler", xpackInfo => {
      let xpackInfoUnpacked; // If, for some reason, we cannot get the license information
      // from Elasticsearch, assume worst case and disable

      if (!xpackInfo || !xpackInfo.isAvailable()) {
        this.info = null;
        return;
      }

      try {
        xpackInfoUnpacked = {
          kibana: {
            version: (0, _lodash.get)(this.server, 'plugins.kibana.status.plugin.version', 'unknown')
          },
          license: {
            type: xpackInfo.license.getType(),
            expired: !xpackInfo.license.isActive(),
            expiry_date_in_millis: xpackInfo.license.getExpiryDateInMillis() !== undefined ? xpackInfo.license.getExpiryDateInMillis() : -1
          },
          security: {
            enabled: !!xpackInfo.feature('security') && xpackInfo.feature('security').isEnabled(),
            available: !!xpackInfo.feature('security')
          },
          watcher: {
            enabled: !!xpackInfo.feature('watcher') && xpackInfo.feature('watcher').isEnabled(),
            available: !!xpackInfo.feature('watcher')
          }
        };
      } catch (e) {
        this.server.log(`Error accessing required xPackInfo in ${this.PLUGIN_ID} Kibana adapter`);
        throw e;
      }

      const assertData = _adapter_types.RuntimeFrameworkInfo.decode(xpackInfoUnpacked);

      if ((0, _Either.isLeft)(assertData)) {
        throw new Error(`Error parsing xpack info in ${this.PLUGIN_ID},   ${_PathReporter.PathReporter.report(assertData)[0]}`);
      }

      this.info = xpackInfoUnpacked;
      return {
        security: xpackInfoUnpacked.security,
        settings: this.getSetting(this.CONFIG_PREFIX || this.PLUGIN_ID)
      };
    });

    const xpackMainPlugin = this.server.plugins.xpack_main;
    const thisPlugin = this.server.plugins.beats_management;
    (0, _mirror_plugin_status.mirrorPluginStatus)(xpackMainPlugin, thisPlugin);
    xpackMainPlugin.status.on('green', () => {
      this.xpackInfoWasUpdatedHandler(xpackMainPlugin.info); // Register a function that is called whenever the xpack info changes,
      // to re-compute the license check results for this plugin

      xpackMainPlugin.info.feature(this.PLUGIN_ID).registerLicenseCheckResultsGenerator(this.xpackInfoWasUpdatedHandler);
    });
  }

  on(event, cb) {
    switch (event) {
      case 'xpack.status.green':
        this.server.plugins.xpack_main.status.on('green', cb);

      case 'elasticsearch.status.green':
        this.server.plugins.elasticsearch.status.on('green', cb);
    }
  }

  getSetting(settingPath) {
    return this.server.config().get(settingPath);
  }

  log(text) {
    this.server.log(text);
  }

  exposeStaticDir(urlPath, dir) {
    this.server.route({
      handler: {
        directory: {
          path: dir
        }
      },
      method: 'GET',
      path: urlPath
    });
  }

  registerRoute(route) {
    this.server.route({
      handler: async (request, h) => {
        // Note, RuntimeKibanaServerRequest is avalaible to validate request, and its type *is* KibanaServerRequest
        // but is not used here for perf reasons. It's value here is not high enough...
        return await route.handler((await this.wrapRequest(request)), h);
      },
      method: route.method,
      path: route.path,
      config: route.config
    });
  }

  async wrapRequest(req) {
    const {
      params,
      payload,
      query,
      headers,
      info
    } = req;
    let isAuthenticated = headers.authorization != null;
    let user;

    if (isAuthenticated) {
      user = await this.getUser(req);

      if (!user) {
        isAuthenticated = false;
      }
    }

    return {
      user: isAuthenticated && user ? {
        kind: 'authenticated',
        [_adapter_types.internalAuthData]: headers,
        ...user
      } : {
        kind: 'unauthenticated'
      },
      headers,
      info,
      params,
      payload,
      query
    };
  }

  async getUser(request) {
    let user;

    try {
      user = await this.server.plugins.security.getUser(request);
    } catch (e) {
      return null;
    }

    if (user === null) {
      return null;
    }

    const assertKibanaUser = _adapter_types.RuntimeKibanaUser.decode(user);

    if ((0, _Either.isLeft)(assertKibanaUser)) {
      throw new Error(`Error parsing user info in ${this.PLUGIN_ID},   ${_PathReporter.PathReporter.report(assertKibanaUser)[0]}`);
    }

    return user;
  }

}

exports.KibanaBackendFrameworkAdapter = KibanaBackendFrameworkAdapter;