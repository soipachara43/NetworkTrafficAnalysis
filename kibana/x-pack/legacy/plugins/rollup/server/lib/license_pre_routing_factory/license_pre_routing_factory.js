"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.licensePreRoutingFactory = void 0;

var _common = require("../../../common");

var _license_status = require("../../../../../common/constants/license_status");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const licensePreRoutingFactory = (server, handler) => {
  const xpackMainPlugin = server.plugins.xpack_main; // License checking and enable/disable logic

  return function licensePreRouting(ctx, request, response) {
    const licenseCheckResults = xpackMainPlugin.info.feature(_common.PLUGIN.ID).getLicenseCheckResults();
    const {
      status
    } = licenseCheckResults;

    if (status !== _license_status.LICENSE_STATUS_VALID) {
      return response.customError({
        body: {
          message: licenseCheckResults.messsage
        },
        statusCode: 403
      });
    }

    return handler(ctx, request, response);
  };
};

exports.licensePreRoutingFactory = licensePreRoutingFactory;