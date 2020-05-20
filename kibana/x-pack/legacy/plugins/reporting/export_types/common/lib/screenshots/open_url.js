"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openUrl = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const openUrl = async (server, browser, url, conditionalHeaders, logger) => {
  const config = server.config();

  try {
    await browser.open(url, {
      conditionalHeaders,
      waitForSelector: _constants.PAGELOAD_SELECTOR,
      timeout: config.get('xpack.reporting.capture.timeouts.openUrl')
    }, logger);
  } catch (err) {
    throw new Error(_i18n.i18n.translate('xpack.reporting.screencapture.couldntLoadKibana', {
      defaultMessage: `An error occurred when trying to open the Kibana URL. You may need to increase '{configKey}'. {error}`,
      values: {
        configKey: 'xpack.reporting.capture.timeouts.openUrl',
        error: err
      }
    }));
  }
};

exports.openUrl = openUrl;