"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beatEventsRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const beatEventsRoute = libs => ({
  method: 'POST',
  path: '/api/beats/{beatId}/events',
  config: {
    validate: {
      headers: _joi.default.object({
        'kbn-beats-access-token': _joi.default.string().required()
      }).options({
        allowUnknown: true
      })
    },
    auth: false
  },
  handler: async request => {
    const beatId = request.params.beatId;
    const events = request.payload;
    const accessToken = request.headers['kbn-beats-access-token'];
    const beat = await libs.beats.getById(libs.framework.internalUser, beatId);

    if (beat === null) {
      return {
        error: {
          message: `Beat "${beatId}" not found`,
          code: 400
        },
        success: false
      };
    }

    const isAccessTokenValid = beat.access_token === accessToken;

    if (!isAccessTokenValid) {
      return {
        error: {
          message: `Invalid access token`,
          code: 401
        },
        success: false
      };
    }

    const results = await libs.beatEvents.log(libs.framework.internalUser, beat.id, events);
    return {
      results,
      success: true
    };
  }
});

exports.beatEventsRoute = beatEventsRoute;