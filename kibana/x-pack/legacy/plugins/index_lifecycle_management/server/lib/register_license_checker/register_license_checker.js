"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerLicenseChecker = registerLicenseChecker;

var _mirror_plugin_status = require("../../../../../server/lib/mirror_plugin_status");

var _constants = require("../../../common/constants");

var _check_license = require("../check_license");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
function registerLicenseChecker(server) {
  const xpackMainPlugin = server.plugins.xpack_main;
  const ilmPlugin = server.plugins.index_lifecycle_management;
  (0, _mirror_plugin_status.mirrorPluginStatus)(xpackMainPlugin, ilmPlugin);
  xpackMainPlugin.status.once('green', () => {
    // Register a function that is called whenever the xpack info changes,
    // to re-compute the license check results for this plugin
    xpackMainPlugin.info.feature(_constants.PLUGIN.ID).registerLicenseCheckResultsGenerator(_check_license.checkLicense);
  });
}