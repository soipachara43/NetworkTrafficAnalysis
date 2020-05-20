"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readPrivilegesRoute = void 0;

var _fp = require("lodash/fp");

var _constants = require("../../../../../common/constants");

var _utils = require("../utils");

var _read_privileges = require("../../privileges/read_privileges");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const readPrivilegesRoute = (router, security, usingEphemeralEncryptionKey) => {
  router.get({
    path: _constants.DETECTION_ENGINE_PRIVILEGES_URL,
    validate: false,
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    try {
      var _context$siem, _ref;

      const clusterClient = context.core.elasticsearch.dataClient;
      const siemClient = (_context$siem = context.siem) === null || _context$siem === void 0 ? void 0 : _context$siem.getSiemClient();

      if (!siemClient) {
        return siemResponse.error({
          statusCode: 404
        });
      }

      const index = siemClient.signalsIndex;
      const clusterPrivileges = await (0, _read_privileges.readPrivileges)(clusterClient.callAsCurrentUser, index);
      const privileges = (0, _fp.merge)(clusterPrivileges, {
        is_authenticated: (_ref = security === null || security === void 0 ? void 0 : security.authc.isAuthenticated(request)) !== null && _ref !== void 0 ? _ref : false,
        has_encryption_key: !usingEphemeralEncryptionKey
      });
      return response.ok({
        body: privileges
      });
    } catch (err) {
      const error = (0, _utils.transformError)(err);
      return siemResponse.error({
        body: error.message,
        statusCode: error.statusCode
      });
    }
  });
};

exports.readPrivilegesRoute = readPrivilegesRoute;