"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBeatEnrollmentRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _lodash = require("lodash");

var _security = require("../../../common/constants/security");

var _types = require("../../lib/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: write to Kibana audit log file https://github.com/elastic/kibana/issues/26024
const createBeatEnrollmentRoute = libs => ({
  method: 'POST',
  path: '/api/beats/agent/{beatId}',
  licenseRequired: _security.REQUIRED_LICENSES,
  config: {
    auth: false,
    validate: {
      headers: _joi.default.object({
        'kbn-beats-enrollment-token': _joi.default.string().required()
      }).options({
        allowUnknown: true
      }),
      payload: _joi.default.object({
        host_name: _joi.default.string().required(),
        name: _joi.default.string().required(),
        type: _joi.default.string().required(),
        version: _joi.default.string().required()
      }).required()
    }
  },
  handler: async request => {
    const {
      beatId
    } = request.params;
    const enrollmentToken = request.headers['kbn-beats-enrollment-token'];
    const {
      status,
      accessToken
    } = await libs.beats.enrollBeat(enrollmentToken, beatId, request.info.remoteAddress, (0, _lodash.omit)(request.payload, 'enrollment_token'));

    switch (status) {
      case _types.BeatEnrollmentStatus.ExpiredEnrollmentToken:
        return {
          error: {
            message: _types.BeatEnrollmentStatus.ExpiredEnrollmentToken,
            code: 400
          },
          success: false
        };

      case _types.BeatEnrollmentStatus.InvalidEnrollmentToken:
        return {
          error: {
            message: _types.BeatEnrollmentStatus.InvalidEnrollmentToken,
            code: 400
          },
          success: false
        };

      case _types.BeatEnrollmentStatus.Success:
      default:
        return {
          item: accessToken,
          action: 'created',
          success: true
        };
    }
  }
});

exports.createBeatEnrollmentRoute = createBeatEnrollmentRoute;