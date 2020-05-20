"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsertConfigurationRoute = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var _joi = _interopRequireDefault(require("joi"));

var _Either = require("fp-ts/lib/Either");

var _constants = require("../../../common/constants");

var _domain_types = require("../../../common/domain_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: write to Kibana audit log file
const upsertConfigurationRoute = libs => ({
  method: 'PUT',
  path: '/api/beats/configurations',
  licenseRequired: _constants.REQUIRED_LICENSES,
  requiredRoles: ['beats_admin'],
  config: {
    validate: {
      payload: _joi.default.array().items(_joi.default.object({}).unknown(true))
    }
  },
  handler: async request => {
    const result = await Promise.all(request.payload.map(async block => {
      const assertData = (0, _domain_types.createConfigurationBlockInterface)().decode(block);

      if ((0, _Either.isLeft)(assertData)) {
        return {
          error: `Error parsing block info, ${_PathReporter.PathReporter.report(assertData)[0]}`
        };
      }

      const {
        blockID,
        success,
        error
      } = await libs.configurationBlocks.save(request.user, block);

      if (error) {
        return {
          success,
          error
        };
      }

      return {
        success,
        blockID
      };
    }));
    return {
      results: result.map(r => ({
        success: r.success,
        // TODO: we need to surface this data, not hard coded
        action: 'created'
      })),
      success: true
    };
  }
});

exports.upsertConfigurationRoute = upsertConfigurationRoute;