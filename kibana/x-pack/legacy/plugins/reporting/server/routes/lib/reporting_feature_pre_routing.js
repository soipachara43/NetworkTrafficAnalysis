"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportingFeaturePreRoutingFactory = void 0;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const reportingFeaturePreRoutingFactory = function reportingFeaturePreRoutingFn(server, plugins, logger) {
  const xpackMainPlugin = server.plugins.xpack_main;
  const pluginId = 'reporting'; // License checking and enable/disable logic

  return function reportingFeaturePreRouting(getReportingFeatureId) {
    return function licensePreRouting(request) {
      const licenseCheckResults = xpackMainPlugin.info.feature(pluginId).getLicenseCheckResults();
      const reportingFeatureId = getReportingFeatureId(request);
      const reportingFeature = licenseCheckResults[reportingFeatureId];

      if (!reportingFeature.showLinks || !reportingFeature.enableLinks) {
        throw _boom.default.forbidden(reportingFeature.message);
      } else {
        return reportingFeature;
      }
    };
  };
};

exports.reportingFeaturePreRoutingFactory = reportingFeaturePreRoutingFactory;