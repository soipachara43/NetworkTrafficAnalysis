"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KpiNetwork = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class KpiNetwork {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getKpiNetwork(req, options) {
    return this.adapter.getKpiNetwork(req, options);
  }

}

exports.KpiNetwork = KpiNetwork;