"use strict";

var _new_platform = require("ui/new_platform");

var _routes = _interopRequireDefault(require("ui/routes"));

var _legacy = require("../../../../../src/legacy/core_plugins/management/public/legacy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var legacyAPI = {
  registerSavedObjectsManagementAction: function registerSavedObjectsManagementAction(action) {
    _legacy.setup.savedObjects.registry.register(action);
  }
};
var spaces = _new_platform.npSetup.plugins.spaces;

if (spaces) {
  spaces.registerLegacyAPI(legacyAPI);

  _routes.default.when('/management/spaces/list', {
    redirectTo: '/management/kibana/spaces'
  });

  _routes.default.when('/management/spaces/create', {
    redirectTo: '/management/kibana/spaces/create'
  });

  _routes.default.when('/management/spaces/edit/:spaceId', {
    redirectTo: '/management/kibana/spaces/edit/:spaceId'
  });
}