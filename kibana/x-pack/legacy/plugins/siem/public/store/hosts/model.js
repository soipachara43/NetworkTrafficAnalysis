"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostsTableType = exports.HostsType = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HostsType;
exports.HostsType = HostsType;

(function (HostsType) {
  HostsType["page"] = "page";
  HostsType["details"] = "details";
})(HostsType || (exports.HostsType = HostsType = {}));

var HostsTableType;
exports.HostsTableType = HostsTableType;

(function (HostsTableType) {
  HostsTableType["authentications"] = "authentications";
  HostsTableType["hosts"] = "allHosts";
  HostsTableType["events"] = "events";
  HostsTableType["uncommonProcesses"] = "uncommonProcesses";
  HostsTableType["anomalies"] = "anomalies";
  HostsTableType["alerts"] = "alerts";
})(HostsTableType || (exports.HostsTableType = HostsTableType = {}));