"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetworkRoutePath = void 0;

var _types = require("./types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getNetworkRoutePath = function getNetworkRoutePath(pagePath, capabilitiesFetched, hasMlUserPermission) {
  if (capabilitiesFetched && !hasMlUserPermission) {
    return "".concat(pagePath, "/:tabName(").concat(_types.NetworkRouteType.flows, "|").concat(_types.NetworkRouteType.dns, "|").concat(_types.NetworkRouteType.http, "|").concat(_types.NetworkRouteType.tls, "|").concat(_types.NetworkRouteType.alerts, ")");
  }

  return "".concat(pagePath, "/:tabName(") + "".concat(_types.NetworkRouteType.flows, "|") + "".concat(_types.NetworkRouteType.dns, "|") + "".concat(_types.NetworkRouteType.anomalies, "|") + "".concat(_types.NetworkRouteType.http, "|") + "".concat(_types.NetworkRouteType.tls, "|") + "".concat(_types.NetworkRouteType.alerts, ")");
};

exports.getNetworkRoutePath = getNetworkRoutePath;