"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetBeatRoute = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetBeatRoute = libs => ({
  method: 'GET',
  path: '/api/beats/agent/{beatId}/{token?}',
  requiredRoles: ['beats_admin'],
  handler: async request => {
    const beatId = request.params.beatId;
    let beat;

    if (beatId === 'unknown') {
      beat = await libs.beats.getByEnrollmentToken(request.user, request.params.token);

      if (beat === null) {
        return {
          success: false
        };
      }
    } else {
      beat = await libs.beats.getById(request.user, beatId);

      if (beat === null) {
        return {
          error: {
            message: 'Beat not found',
            code: 404
          },
          success: false
        };
      }
    }

    delete beat.access_token;
    return {
      item: beat,
      success: true
    };
  }
});

exports.createGetBeatRoute = createGetBeatRoute;