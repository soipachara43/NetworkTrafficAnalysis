"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptedSavedObjects = void 0;

var _audit_logger = require("../../server/lib/audit_logger");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const encryptedSavedObjects = kibana => new kibana.Plugin({
  id: 'encryptedSavedObjects',
  configPrefix: 'xpack.encryptedSavedObjects',
  require: ['xpack_main'],
  // Some legacy plugins still use `enabled` config key, so we keep it here, but the rest of the
  // keys is handled by the New Platform plugin.
  config: Joi => Joi.object({
    enabled: Joi.boolean().default(true)
  }).unknown(true).default(),

  init(server) {
    const encryptedSavedObjectsPlugin = server.newPlatform.setup.plugins.encryptedSavedObjects;

    if (!encryptedSavedObjectsPlugin) {
      throw new Error('New Platform XPack EncryptedSavedObjects plugin is not available.');
    }

    encryptedSavedObjectsPlugin.__legacyCompat.registerLegacyAPI({
      auditLogger: new _audit_logger.AuditLogger(server, 'encryptedSavedObjects', server.config(), server.plugins.xpack_main.info)
    });
  }

});

exports.encryptedSavedObjects = encryptedSavedObjects;