"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infra = infra;

var _server = require("../../../plugins/infra/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function infra(kibana) {
  return new kibana.Plugin({
    id: 'infra',
    configPrefix: 'xpack.infra',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      mappings: _server.savedObjectMappings
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true)
      }).unknown().default();
    }

  });
}