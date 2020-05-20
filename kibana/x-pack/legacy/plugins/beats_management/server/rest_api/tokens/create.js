"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTokensRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _lodash = require("lodash");

var _security = require("../../../common/constants/security");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: write to Kibana audit log file
const DEFAULT_NUM_TOKENS = 1;

const createTokensRoute = libs => ({
  method: 'POST',
  path: '/api/beats/enrollment_tokens',
  licenseRequired: _security.REQUIRED_LICENSES,
  requiredRoles: ['beats_admin'],
  config: {
    validate: {
      payload: _joi.default.object({
        num_tokens: _joi.default.number().optional().default(DEFAULT_NUM_TOKENS).min(1)
      }).allow(null)
    }
  },
  handler: async request => {
    const numTokens = (0, _lodash.get)(request, 'payload.num_tokens', DEFAULT_NUM_TOKENS);

    try {
      const tokens = await libs.tokens.createEnrollmentTokens(request.user, numTokens);
      return {
        results: tokens.map(token => ({
          item: token,
          success: true,
          action: 'created'
        })),
        success: true
      };
    } catch (err) {
      libs.framework.log(err.message);
      return {
        error: {
          message: 'An error occured, please check your Kibana logs',
          code: 500
        },
        success: false
      };
    }
  }
});

exports.createTokensRoute = createTokensRoute;