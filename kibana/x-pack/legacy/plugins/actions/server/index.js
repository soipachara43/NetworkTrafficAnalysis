"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = actions;

var _mappings = _interopRequireDefault(require("./mappings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function actions(kibana) {
  return new kibana.Plugin({
    id: 'actions',
    configPrefix: 'xpack.actions',

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true)
      }).unknown(true).default();
    },

    require: ['kibana', 'elasticsearch'],

    isEnabled(config) {
      return config.get('xpack.encryptedSavedObjects.enabled') === true && config.get('xpack.actions.enabled') === true && config.get('xpack.task_manager.enabled') === true;
    },

    uiExports: {
      mappings: _mappings.default
    }
  });
}