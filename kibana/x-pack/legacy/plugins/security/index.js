"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.security = void 0;

var _path = require("path");

var _server = require("../../../../src/core/server");

var _audit_logger = require("../../server/lib/audit_logger");

var _watch_status_and_license_to_initialize = require("../../server/lib/watch_status_and_license_to_initialize");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
function getSecurityPluginSetup(server) {
  const securityPlugin = server.newPlatform.setup.plugins.security;

  if (!securityPlugin) {
    throw new Error('Kibana Platform Security plugin is not available.');
  }

  return securityPlugin;
}

const security = kibana => new kibana.Plugin({
  id: 'security',
  configPrefix: 'xpack.security',
  publicDir: (0, _path.resolve)(__dirname, 'public'),
  require: ['kibana', 'elasticsearch', 'xpack_main'],

  // This config is only used by `AuditLogger` and should be removed as soon as `AuditLogger`
  // is migrated to Kibana Platform.
  config(Joi) {
    return Joi.object({
      enabled: Joi.boolean().default(true),
      audit: Joi.object({
        enabled: Joi.boolean().default(false)
      }).default()
    }).unknown().default();
  },

  uiExports: {
    hacks: ['plugins/security/hacks/legacy'],
    injectDefaultVars: server => {
      return {
        enableSpaceAwarePrivileges: server.config().get('xpack.spaces.enabled')
      };
    }
  },

  async postInit(server) {
    (0, _watch_status_and_license_to_initialize.watchStatusAndLicenseToInitialize)(server.plugins.xpack_main, this, async () => {
      const xpackInfo = server.plugins.xpack_main.info;

      if (xpackInfo.isAvailable() && xpackInfo.feature('security').isEnabled()) {
        await getSecurityPluginSetup(server).__legacyCompat.registerPrivilegesWithCluster();
      }
    });
  },

  async init(server) {
    const securityPlugin = getSecurityPluginSetup(server);
    const xpackInfo = server.plugins.xpack_main.info;

    securityPlugin.__legacyCompat.registerLegacyAPI({
      auditLogger: new _audit_logger.AuditLogger(server, 'security', server.config(), xpackInfo)
    }); // Legacy xPack Info endpoint returns whatever we return in a callback for `registerLicenseCheckResultsGenerator`
    // and the result is consumed by the legacy plugins all over the place, so we should keep it here for now. We assume
    // that when legacy callback is called license has been already propagated to the new platform security plugin and
    // features are up to date.


    xpackInfo.feature(this.id).registerLicenseCheckResultsGenerator(() => securityPlugin.__legacyCompat.license.getFeatures());
    server.expose({
      getUser: async request => securityPlugin.authc.getCurrentUser(_server.KibanaRequest.from(request))
    });
  }

});

exports.security = security;