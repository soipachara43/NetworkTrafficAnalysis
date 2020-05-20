"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.licensePreRoutingFactory = void 0;

var _lodash = require("lodash");

var _constants = require("../../../common/constants");

var _error_wrappers = require("../error_wrappers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const licensePreRoutingFactory = (0, _lodash.once)(server => {
  const xpackMainPlugin = server.plugins.xpack_main; // License checking and enable/disable logic

  function licensePreRouting() {
    const licenseCheckResults = xpackMainPlugin.info.feature(_constants.PLUGIN.ID).getLicenseCheckResults();

    if (!licenseCheckResults.isAvailable) {
      const error = new Error(licenseCheckResults.message);
      const statusCode = 403;
      throw (0, _error_wrappers.wrapCustomError)(error, statusCode);
    }

    return null;
  }

  return licensePreRouting;
});
exports.licensePreRoutingFactory = licensePreRoutingFactory;