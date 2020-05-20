"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkRouteType = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NetworkRouteType;
exports.NetworkRouteType = NetworkRouteType;

(function (NetworkRouteType) {
  NetworkRouteType["flows"] = "flows";
  NetworkRouteType["dns"] = "dns";
  NetworkRouteType["anomalies"] = "anomalies";
  NetworkRouteType["tls"] = "tls";
  NetworkRouteType["http"] = "http";
  NetworkRouteType["alerts"] = "alerts";
})(NetworkRouteType || (exports.NetworkRouteType = NetworkRouteType = {}));