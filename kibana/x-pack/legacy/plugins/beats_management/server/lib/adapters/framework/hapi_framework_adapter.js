"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HapiBackendFrameworkAdapter = void 0;

var _adapter_types = require("./adapter_types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HapiBackendFrameworkAdapter {
  constructor(settings = {
    encryptionKey: 'something_who_cares',
    enrollmentTokensTtlInSeconds: 10 * 60 // 10 minutes

  }, hapiServer, license = 'trial', securityEnabled = true, licenseActive = true) {
    _defineProperty(this, "info", null);

    _defineProperty(this, "internalUser", _adapter_types.internalUser);

    _defineProperty(this, "settings", void 0);

    _defineProperty(this, "server", void 0);

    this.server = hapiServer;
    this.settings = settings;
    const now = new Date();
    this.info = {
      kibana: {
        version: 'unknown'
      },
      license: {
        type: license,
        expired: !licenseActive,
        expiry_date_in_millis: new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime()
      },
      security: {
        enabled: securityEnabled,
        available: securityEnabled
      },
      watcher: {
        enabled: true,
        available: true
      }
    };
  }

  log(text) {
    this.server.log(text);
  }

  on(event, cb) {
    cb();
  }

  getSetting(settingPath) {
    switch (settingPath) {
      case 'xpack.beats.enrollmentTokensTtlInSeconds':
        return this.settings.enrollmentTokensTtlInSeconds;

      case 'xpack.beats.encryptionKey':
        return this.settings.encryptionKey;
    }
  }

  exposeStaticDir(urlPath, dir) {
    if (!this.server) {
      throw new Error('Must pass a hapi server into the adapter to use exposeStaticDir');
    }

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
    if (!this.server) {
      throw new Error('Must pass a hapi server into the adapter to use registerRoute');
    }

    const wrappedHandler = licenseRequired => (request, h) => {
      return route.handler(this.wrapRequest(request), h);
    };

    this.server.route({
      handler: wrappedHandler(route.licenseRequired || []),
      method: route.method,
      path: route.path,
      config: { ...route.config,
        auth: false
      }
    });
  }

  async injectRequstForTesting({
    method,
    url,
    headers,
    payload
  }) {
    return await this.server.inject({
      method,
      url,
      headers,
      payload
    });
  }

  wrapRequest(req) {
    const {
      params,
      payload,
      query,
      headers,
      info
    } = req;
    const isAuthenticated = headers.authorization != null;
    return {
      user: isAuthenticated ? {
        kind: 'authenticated',
        [_adapter_types.internalAuthData]: headers,
        username: 'elastic',
        roles: ['superuser'],
        full_name: null,
        email: null,
        enabled: true
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

}

exports.HapiBackendFrameworkAdapter = HapiBackendFrameworkAdapter;