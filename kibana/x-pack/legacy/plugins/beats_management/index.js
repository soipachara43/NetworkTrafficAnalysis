"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beats = beats;
exports.config = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _path = require("path");

var _constants = require("./common/constants");

var _plugin = require("./common/constants/plugin");

var _kibana = require("./server/kibana.index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const DEFAULT_ENROLLMENT_TOKENS_TTL_S = 10 * 60; // 10 minutes

const config = _joi.default.object({
  enabled: _joi.default.boolean().default(true),
  defaultUserRoles: _joi.default.array().items(_joi.default.string()).default(['superuser']),
  encryptionKey: _joi.default.string().default('xpack_beats_default_encryptionKey'),
  enrollmentTokensTtlInSeconds: _joi.default.number().integer().min(1).max(10 * 60 * 14) // No more then 2 weeks for security reasons
  .default(DEFAULT_ENROLLMENT_TOKENS_TTL_S)
}).default();

exports.config = config;

function beats(kibana) {
  return new kibana.Plugin({
    id: _constants.PLUGIN.ID,
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    uiExports: {
      managementSections: ['plugins/beats_management']
    },
    config: () => config,
    configPrefix: _plugin.CONFIG_PREFIX,

    init(server) {
      (0, _kibana.initServerWithKibana)(server);
    }

  });
}