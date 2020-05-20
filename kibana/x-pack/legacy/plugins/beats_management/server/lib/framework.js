"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackendFrameworkLib = void 0;

var _lodash = require("lodash");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BackendFrameworkLib {
  constructor(adapter) {
    this.adapter = adapter;

    _defineProperty(this, "log", this.adapter.log);

    _defineProperty(this, "on", this.adapter.on.bind(this.adapter));

    _defineProperty(this, "exposeStaticDir", this.adapter.exposeStaticDir);

    _defineProperty(this, "internalUser", this.adapter.internalUser);

    this.validateConfig();
  }

  registerRoute(route) {
    this.adapter.registerRoute({ ...route,
      handler: this.wrapErrors(this.wrapRouteWithSecurity(route.handler, route.licenseRequired || [], route.requiredRoles))
    });
  }

  getSetting(setting) {
    return this.adapter.getSetting(`xpack.beats.${setting}`);
  }
  /**
   * Expired `null` happens when we have no xpack info
   */


  get license() {
    return {
      type: this.adapter.info ? this.adapter.info.license.type : 'unknown',
      expired: this.adapter.info ? this.adapter.info.license.expired : null
    };
  }

  get securityIsEnabled() {
    return this.adapter.info ? this.adapter.info.security.enabled : false;
  }

  validateConfig() {
    const encryptionKey = this.adapter.getSetting('xpack.beats.encryptionKey');

    if (!encryptionKey) {
      this.adapter.log('Using a default encryption key for xpack.beats.encryptionKey. It is recommended that you set xpack.beats.encryptionKey in kibana.yml with a unique token');
    }
  }

  wrapRouteWithSecurity(handler, requiredLicense, requiredRoles) {
    return async request => {
      if (requiredLicense.length > 0 && (this.license.expired || !requiredLicense.includes(this.license.type))) {
        return {
          error: {
            message: `Your ${this.license.type} license does not support this API or is expired. Please upgrade your license.`,
            code: 403
          },
          success: false
        };
      }

      if (requiredRoles) {
        if (request.user.kind !== 'authenticated') {
          return {
            error: {
              message: `Request must be authenticated`,
              code: 403
            },
            success: false
          };
        }

        if (request.user.kind === 'authenticated' && !request.user.roles.includes('superuser') && (0, _lodash.difference)(requiredRoles, request.user.roles).length !== 0) {
          return {
            error: {
              message: `Request must be authenticated by a user with one of the following user roles: ${requiredRoles.join(',')}`,
              code: 403
            },
            success: false
          };
        }
      }

      return await handler(request);
    };
  }

  wrapErrors(handler) {
    return async (request, h) => {
      try {
        const result = await handler(request);

        if (!result.error) {
          return h.response(result);
        }

        return h.response({
          error: result.error,
          success: false
        }).code(result.error.code || 400);
      } catch (err) {
        let statusCode = err.statusCode; // This is the only known non-status code error in the system, but just in case we have an else

        if (!statusCode && err.message.includes('Invalid user type')) {
          statusCode = 403;
        } else {
          statusCode = 500;
        }

        if (statusCode === 403) {
          return h.response({
            error: {
              message: 'Insufficient user permissions for managing Beats configuration',
              code: 403
            },
            success: false
          }).code(403);
        }

        return h.response({
          error: {
            message: err.message,
            code: statusCode
          },
          success: false
        }).code(statusCode);
      }
    };
  }

}

exports.BackendFrameworkLib = BackendFrameworkLib;