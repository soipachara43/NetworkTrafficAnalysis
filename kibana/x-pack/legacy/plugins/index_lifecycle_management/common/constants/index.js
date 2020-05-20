"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASE_PATH = exports.PLUGIN = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PLUGIN = {
  ID: 'index_lifecycle_management',
  TITLE: _i18n.i18n.translate('xpack.indexLifecycleMgmt.appTitle', {
    defaultMessage: 'Index Lifecycle Policies'
  })
};
exports.PLUGIN = PLUGIN;
const BASE_PATH = '/management/elasticsearch/index_lifecycle_management/';
exports.BASE_PATH = BASE_PATH;