"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUserWrite = canUserWrite;
exports.getFullscreen = getFullscreen;
exports.getZoomScale = getZoomScale;
exports.getServerFunctions = getServerFunctions;
exports.getAppReady = getAppReady;
exports.getBasePath = getBasePath;
exports.isAppReady = isAppReady;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// page getters
function canUserWrite(state) {
  return (0, _lodash.get)(state, 'transient.canUserWrite', true);
}

function getFullscreen(state) {
  return (0, _lodash.get)(state, 'transient.fullscreen', false);
}

function getZoomScale(state) {
  return (0, _lodash.get)(state, 'transient.zoomScale', 1);
}

function getServerFunctions(state) {
  return state.app.serverFunctions;
}

function getAppReady(state) {
  return state.app.ready;
}

function getBasePath(state) {
  return state.app.basePath;
} // return true only when the required parameters are in the state


function isAppReady(state) {
  var appReady = getAppReady(state);
  return appReady === true;
}