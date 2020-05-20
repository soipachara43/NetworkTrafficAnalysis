"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggersActionsUI = triggersActionsUI;

var _path = require("path");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function triggersActionsUI(kibana) {
  return new kibana.Plugin({
    id: 'triggers_actions_ui',
    configPrefix: 'xpack.triggers_actions_ui',

    isEnabled(config) {
      return config.get('xpack.triggers_actions_ui.enabled') && (config.get('xpack.actions.enabled') || config.get('xpack.alerting.enabled'));
    },

    publicDir: (0, _path.resolve)(__dirname, 'public'),
    require: ['kibana'],

    config(Joi) {
      return Joi.object().keys({
        enabled: Joi.boolean().default(true)
      }).default();
    },

    uiExports: {
      styleSheetPaths: (0, _path.resolve)(__dirname, 'public/index.scss')
    }
  });
}