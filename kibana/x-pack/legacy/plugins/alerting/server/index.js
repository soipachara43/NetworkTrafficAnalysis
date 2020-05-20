"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alerting = alerting;

var _mappings = _interopRequireDefault(require("./mappings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function alerting(kibana) {
  return new kibana.Plugin({
    id: 'alerting',
    configPrefix: 'xpack.alerting',
    require: ['kibana', 'elasticsearch', 'actions', 'task_manager', 'encryptedSavedObjects'],

    isEnabled(config) {
      return config.get('xpack.alerting.enabled') === true && config.get('xpack.actions.enabled') === true && config.get('xpack.encryptedSavedObjects.enabled') === true && config.get('xpack.task_manager.enabled') === true;
    },

    config(Joi) {
      return Joi.object().keys({
        enabled: Joi.boolean().default(true)
      }).default();
    },

    uiExports: {
      mappings: _mappings.default
    }
  });
}