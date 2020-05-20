"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upgradeAssistant = upgradeAssistant;

var _mappings = _interopRequireDefault(require("./mappings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function upgradeAssistant(kibana) {
  const config = {
    id: 'upgrade_assistant',
    uiExports: {
      // @ts-ignore
      savedObjectSchemas: {
        'upgrade-assistant-reindex-operation': {
          isNamespaceAgnostic: true
        },
        'upgrade-assistant-telemetry': {
          isNamespaceAgnostic: true
        }
      },
      mappings: _mappings.default
    },

    init() {}

  };
  return new kibana.Plugin(config);
}