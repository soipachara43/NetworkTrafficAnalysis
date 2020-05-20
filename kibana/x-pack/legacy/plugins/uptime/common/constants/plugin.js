"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLUGIN = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PLUGIN = {
  APP_ROOT_ID: 'react-uptime-root',
  DESCRIPTION: 'Uptime monitoring',
  ID: 'uptime',
  LOCAL_STORAGE_KEY: 'xpack.uptime',
  NAME: _i18n.i18n.translate('xpack.uptime.featureRegistry.uptimeFeatureName', {
    defaultMessage: 'Uptime'
  }),
  ROUTER_BASE_NAME: '/app/uptime#',
  TITLE: 'uptime'
};
exports.PLUGIN = PLUGIN;