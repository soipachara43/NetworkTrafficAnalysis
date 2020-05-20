"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overview = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class Overview {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getOverviewNetwork(req, options) {
    return this.adapter.getOverviewNetwork(req, options);
  }

  async getOverviewHost(req, options) {
    return this.adapter.getOverviewHost(req, options);
  }

}

exports.Overview = Overview;