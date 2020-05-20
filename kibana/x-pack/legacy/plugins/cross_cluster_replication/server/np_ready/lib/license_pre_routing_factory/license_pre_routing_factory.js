"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.licensePreRoutingFactory = void 0;

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const licensePreRoutingFactory = ({
  __LEGACY,
  requestHandler
}) => {
  const xpackMainPlugin = __LEGACY.server.plugins.xpack_main; // License checking and enable/disable logic

  const licensePreRouting = (ctx, request, response) => {
    const licenseCheckResults = xpackMainPlugin.info.feature(_constants.PLUGIN.ID).getLicenseCheckResults();

    if (!licenseCheckResults.isAvailable) {
      return response.forbidden({
        body: licenseCheckResults.message
      });
    } else {
      return requestHandler(ctx, request, response);
    }
  };

  return licensePreRouting;
};

exports.licensePreRoutingFactory = licensePreRoutingFactory;