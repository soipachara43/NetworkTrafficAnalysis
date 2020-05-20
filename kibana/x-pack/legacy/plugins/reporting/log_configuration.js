"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logConfiguration = logConfiguration;

var _getos = _interopRequireDefault(require("getos"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getos = (0, _util.promisify)(_getos.default);

async function logConfiguration(server, logger) {
  const config = server.config();
  const browserType = config.get('xpack.reporting.capture.browser.type');
  logger.debug(`Browser type: ${browserType}`);

  if (browserType === 'chromium') {
    logger.debug(`Chromium sandbox disabled: ${config.get('xpack.reporting.capture.browser.chromium.disableSandbox')}`);
  }

  const os = await getos();
  const {
    os: osName,
    dist,
    release
  } = os;

  if (dist) {
    logger.debug(`Running on os "${osName}", distribution "${dist}", release "${release}"`);
  } else {
    logger.debug(`Running on os "${osName}"`);
  }
}