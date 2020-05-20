"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IpDetailsTableType = exports.NetworkTableType = exports.NetworkType = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NetworkType;
exports.NetworkType = NetworkType;

(function (NetworkType) {
  NetworkType["page"] = "page";
  NetworkType["details"] = "details";
})(NetworkType || (exports.NetworkType = NetworkType = {}));

var NetworkTableType;
exports.NetworkTableType = NetworkTableType;

(function (NetworkTableType) {
  NetworkTableType["alerts"] = "alerts";
  NetworkTableType["dns"] = "dns";
  NetworkTableType["http"] = "http";
  NetworkTableType["topCountriesDestination"] = "topCountriesDestination";
  NetworkTableType["topCountriesSource"] = "topCountriesSource";
  NetworkTableType["topNFlowDestination"] = "topNFlowDestination";
  NetworkTableType["topNFlowSource"] = "topNFlowSource";
  NetworkTableType["tls"] = "tls";
})(NetworkTableType || (exports.NetworkTableType = NetworkTableType = {}));

var IpDetailsTableType;
exports.IpDetailsTableType = IpDetailsTableType;

(function (IpDetailsTableType) {
  IpDetailsTableType["http"] = "http";
  IpDetailsTableType["tls"] = "tls";
  IpDetailsTableType["topCountriesDestination"] = "topCountriesDestination";
  IpDetailsTableType["topCountriesSource"] = "topCountriesSource";
  IpDetailsTableType["topNFlowDestination"] = "topNFlowDestination";
  IpDetailsTableType["topNFlowSource"] = "topNFlowSource";
  IpDetailsTableType["users"] = "users";
})(IpDetailsTableType || (exports.IpDetailsTableType = IpDetailsTableType = {}));