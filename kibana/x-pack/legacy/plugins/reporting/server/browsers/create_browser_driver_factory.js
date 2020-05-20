"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBrowserDriverFactory = createBrowserDriverFactory;

var _download = require("./download");

var _install = require("./install");

var _constants = require("../../common/constants");

var _index = require("./index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createBrowserDriverFactory(server, logger) {
  const config = server.config();
  const dataDir = config.get('path.data');
  const captureConfig = config.get('xpack.reporting.capture');
  const browserType = captureConfig.browser.type;
  const browserAutoDownload = captureConfig.browser.autoDownload;
  const browserConfig = captureConfig.browser[_constants.BROWSER_TYPE];

  if (browserConfig.disableSandbox) {
    logger.warning(`Enabling the Chromium sandbox provides an additional layer of protection.`);
  }

  if (browserAutoDownload) {
    await (0, _download.ensureBrowserDownloaded)(browserType);
  }

  try {
    const {
      binaryPath
    } = await (0, _install.installBrowser)(logger, _index.chromium, dataDir);
    return _index.chromium.createDriverFactory(binaryPath, logger, browserConfig, captureConfig);
  } catch (error) {
    if (error.cause && ['EACCES', 'EEXIST'].includes(error.cause.code)) {
      logger.error(`Error code ${error.cause.code}: Insufficient permissions for extracting the browser archive. ` + `Make sure the Kibana data directory (path.data) is owned by the same user that is running Kibana.`);
    }

    throw error; // reject the promise with the original error
  }
}