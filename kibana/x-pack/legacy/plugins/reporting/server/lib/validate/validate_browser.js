"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBrowser = void 0;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Validate the Reporting headless browser can launch, and that it can connect
 * to the locally running Kibana instance.
 */
const validateBrowser = async (server, browserFactory, logger) => {
  if (browserFactory.type === _constants.BROWSER_TYPE) {
    return browserFactory.test(logger).then(browser => {
      if (browser && browser.close) {
        browser.close();
      } else {
        throw new Error('Could not close browser client handle!');
      }
    });
  }
};

exports.validateBrowser = validateBrowser;