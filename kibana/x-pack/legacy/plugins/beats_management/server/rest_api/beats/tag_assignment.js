"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTagAssignmentsRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _security = require("../../../common/constants/security");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: write to Kibana audit log file https://github.com/elastic/kibana/issues/26024
const createTagAssignmentsRoute = libs => ({
  method: 'POST',
  path: '/api/beats/agents_tags/assignments',
  licenseRequired: _security.REQUIRED_LICENSES,
  requiredRoles: ['beats_admin'],
  config: {
    validate: {
      payload: _joi.default.object({
        assignments: _joi.default.array().items(_joi.default.object({
          beatId: _joi.default.string().required(),
          tag: _joi.default.string().required()
        }))
      }).required()
    }
  },
  handler: async request => {
    const {
      assignments
    } = request.payload;
    const response = await libs.beats.assignTagsToBeats(request.user, assignments);
    return {
      success: true,
      results: response.assignments.map(assignment => ({
        success: assignment.status && assignment.status >= 200 && assignment.status < 300,
        error: !assignment.status || assignment.status >= 300 ? {
          code: assignment.status || 400,
          message: assignment.result
        } : undefined,
        result: assignment.status && assignment.status >= 200 && assignment.status < 300 ? {
          message: assignment.result
        } : undefined
      }))
    };
  }
});

exports.createTagAssignmentsRoute = createTagAssignmentsRoute;