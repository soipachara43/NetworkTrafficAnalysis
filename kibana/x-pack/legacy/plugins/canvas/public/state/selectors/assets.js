"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssets = getAssets;
exports.getAssetIds = getAssetIds;
exports.getAssetById = getAssetById;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var assetRoot = 'assets';

function getAssets(state) {
  return (0, _lodash.get)(state, assetRoot, {});
}

function getAssetIds(state) {
  return Object.keys(getAssets(state));
}

function getAssetById(state, id) {
  return state[assetRoot][id];
}