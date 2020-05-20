"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSetTagRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _lodash = require("lodash");

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: write to Kibana audit log file
const createSetTagRoute = libs => ({
  method: 'PUT',
  path: '/api/beats/tag/{tagId}',
  licenseRequired: _constants.REQUIRED_LICENSES,
  requiredRoles: ['beats_admin'],
  config: {
    validate: {
      params: _joi.default.object({
        tagId: _joi.default.string()
      }),
      payload: _joi.default.object({
        color: _joi.default.string(),
        name: _joi.default.string()
      })
    }
  },
  handler: async request => {
    const defaultConfig = {
      id: request.params.tagId,
      name: request.params.tagId,
      color: '#DD0A73',
      hasConfigurationBlocksTypes: []
    };
    const config = { ...defaultConfig,
      ...(0, _lodash.get)(request, 'payload', {})
    };
    const id = await libs.tags.upsertTag(request.user, config);
    const tag = await libs.tags.getWithIds(request.user, [id]); // TODO the action needs to be surfaced

    return {
      success: true,
      item: tag[0],
      action: 'created'
    };
  }
});

exports.createSetTagRoute = createSetTagRoute;