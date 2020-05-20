"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.createDocLink = exports.transportPortUrl = exports.remoteClustersUrl = exports.skippingDisconnectedClustersUrl = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var skippingDisconnectedClustersUrl;
exports.skippingDisconnectedClustersUrl = skippingDisconnectedClustersUrl;
var remoteClustersUrl;
exports.remoteClustersUrl = remoteClustersUrl;
var transportPortUrl;
exports.transportPortUrl = transportPortUrl;

var _esDocBasePath;

function init(esDocBasePath) {
  _esDocBasePath = esDocBasePath;
}

var createDocLink = function createDocLink(docPath) {
  return "".concat(_esDocBasePath).concat(docPath);
};

exports.createDocLink = createDocLink;