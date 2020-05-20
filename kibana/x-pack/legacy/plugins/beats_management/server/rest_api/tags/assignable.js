"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAssignableTagsRoute = void 0;

var _lodash = require("lodash");

var _security = require("../../../common/constants/security");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createAssignableTagsRoute = libs => ({
  method: 'GET',
  path: '/api/beats/tags/assignable/{beatIds}',
  requiredRoles: ['beats_admin'],
  licenseRequired: _security.REQUIRED_LICENSES,
  handler: async request => {
    const beatIdString = request.params.beatIds;
    const beatIds = beatIdString.split(',').filter(id => id.length > 0);
    const beats = await libs.beats.getByIds(request.user, beatIds);
    const tags = await libs.tags.getNonConflictingTags(request.user, (0, _lodash.flatten)(beats.map(beat => beat.tags)));
    return {
      items: tags,
      success: true
    };
  }
});

exports.createAssignableTagsRoute = createAssignableTagsRoute;