"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTagRemovalsRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _security = require("../../../common/constants/security");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: write to Kibana audit log file https://github.com/elastic/kibana/issues/26024
const createTagRemovalsRoute = libs => ({
  method: 'POST',
  path: '/api/beats/agents_tags/removals',
  licenseRequired: _security.REQUIRED_LICENSES,
  requiredRoles: ['beats_admin'],
  config: {
    validate: {
      payload: _joi.default.object({
        removals: _joi.default.array().items(_joi.default.object({
          beatId: _joi.default.string().required(),
          tag: _joi.default.string().required()
        }))
      }).required()
    }
  },
  handler: async request => {
    const {
      removals
    } = request.payload;
    const response = await libs.beats.removeTagsFromBeats(request.user, removals);
    return {
      success: true,
      results: response.removals.map(removal => ({
        success: removal.status && removal.status >= 200 && removal.status < 300,
        error: !removal.status || removal.status >= 300 ? {
          code: removal.status || 400,
          message: removal.result
        } : undefined,
        result: removal.status && removal.status >= 200 && removal.status < 300 ? {
          message: removal.result
        } : undefined
      }))
    };
  }
});

exports.createTagRemovalsRoute = createTagRemovalsRoute;