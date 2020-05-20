"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KpiHosts = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class KpiHosts {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getKpiHosts(req, options) {
    return this.adapter.getKpiHosts(req, options);
  }

  async getKpiHostDetails(req, options) {
    return this.adapter.getKpiHostDetails(req, options);
  }

}

exports.KpiHosts = KpiHosts;