"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataProvidersSelector = void 0;

var _reselect = require("reselect");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectDataProviders = function selectDataProviders(state) {
  return state.dragAndDrop.dataProviders;
};

var dataProvidersSelector = (0, _reselect.createSelector)(selectDataProviders, function (dataProviders) {
  return dataProviders;
});
exports.dataProvidersSelector = dataProvidersSelector;