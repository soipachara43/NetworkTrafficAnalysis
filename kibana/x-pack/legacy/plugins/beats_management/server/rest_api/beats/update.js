"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBeatUpdateRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _security = require("../../../common/constants/security");

var _adapter_types = require("../../lib/adapters/framework/adapter_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: write to Kibana audit log file (include who did the verification as well) https://github.com/elastic/kibana/issues/26024
const createBeatUpdateRoute = libs => ({
  method: 'PUT',
  path: '/api/beats/agent/{beatId}',
  licenseRequired: _security.REQUIRED_LICENSES,
  requiredRoles: ['beats_admin'],
  config: {
    validate: {
      headers: _joi.default.object({
        'kbn-beats-access-token': _joi.default.string()
      }).options({
        allowUnknown: true
      }),
      params: _joi.default.object({
        beatId: _joi.default.string()
      }),
      payload: _joi.default.object({
        active: _joi.default.bool(),
        ephemeral_id: _joi.default.string(),
        host_name: _joi.default.string(),
        local_configuration_yml: _joi.default.string(),
        metadata: _joi.default.object(),
        name: _joi.default.string(),
        type: _joi.default.string(),
        version: _joi.default.string()
      })
    }
  },
  handler: async request => {
    const {
      beatId
    } = request.params;
    const accessToken = request.headers['kbn-beats-access-token'];
    const remoteAddress = request.info.remoteAddress;
    const userOrToken = accessToken || request.user;

    if (request.user.kind === 'unauthenticated' && request.payload.active !== undefined) {
      return {
        error: {
          message: 'access-token is not a valid auth type to change beat status',
          code: 401
        },
        success: false
      };
    }

    const status = await libs.beats.update(userOrToken, beatId, { ...request.payload,
      host_ip: remoteAddress
    });

    switch (status) {
      case 'beat-not-found':
        return {
          error: {
            message: 'Beat not found',
            code: 404
          },
          success: false
        };

      case 'invalid-access-token':
        return {
          error: {
            message: 'Invalid access token',
            code: 401
          },
          success: false
        };
    }

    const beat = await libs.beats.getById(_adapter_types.internalUser, beatId);

    if (!beat) {
      return {
        error: {
          message: 'Beat not found',
          code: 404
        },
        success: false
      };
    }

    return {
      item: beat,
      action: 'updated',
      success: true
    };
  }
});

exports.createBeatUpdateRoute = createBeatUpdateRoute;