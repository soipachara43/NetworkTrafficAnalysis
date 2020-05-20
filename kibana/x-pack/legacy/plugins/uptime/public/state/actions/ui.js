"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleIntegrationsPopover = exports.setEsKueryString = exports.triggerAppRefresh = exports.setBasePath = exports.setAlertFlyoutVisible = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var setAlertFlyoutVisible = (0, _reduxActions.createAction)('TOGGLE ALERT FLYOUT');
exports.setAlertFlyoutVisible = setAlertFlyoutVisible;
var setBasePath = (0, _reduxActions.createAction)('SET BASE PATH');
exports.setBasePath = setBasePath;
var triggerAppRefresh = (0, _reduxActions.createAction)('REFRESH APP');
exports.triggerAppRefresh = triggerAppRefresh;
var setEsKueryString = (0, _reduxActions.createAction)('SET ES KUERY STRING');
exports.setEsKueryString = setEsKueryString;
var toggleIntegrationsPopover = (0, _reduxActions.createAction)('TOGGLE INTEGRATION POPOVER STATE');
exports.toggleIntegrationsPopover = toggleIntegrationsPopover;