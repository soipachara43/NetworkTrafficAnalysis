"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createListTagsRoute = void 0;

var Joi = _interopRequireWildcard(require("joi"));

var _security = require("../../../common/constants/security");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createListTagsRoute = libs => ({
  method: 'GET',
  path: '/api/beats/tags',
  requiredRoles: ['beats_admin'],
  licenseRequired: _security.REQUIRED_LICENSES,
  validate: {
    headers: Joi.object({
      'kbn-beats-enrollment-token': Joi.string().required()
    }).options({
      allowUnknown: true
    }),
    query: Joi.object({
      ESQuery: Joi.string()
    })
  },
  handler: async request => {
    const tags = await libs.tags.getAll(request.user, request.query && request.query.ESQuery ? JSON.parse(request.query.ESQuery) : undefined);
    return {
      list: tags,
      success: true,
      page: -1,
      total: -1
    };
  }
});

exports.createListTagsRoute = createListTagsRoute;