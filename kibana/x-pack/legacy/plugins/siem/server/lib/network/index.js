"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Network: true
};
exports.Network = void 0;

var _elasticsearch_adapter = require("./elasticsearch_adapter");

Object.keys(_elasticsearch_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _elasticsearch_adapter[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class Network {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getNetworkTopCountries(req, options) {
    return this.adapter.getNetworkTopCountries(req, options);
  }

  async getNetworkTopNFlow(req, options) {
    return this.adapter.getNetworkTopNFlow(req, options);
  }

  async getNetworkDns(req, options) {
    return this.adapter.getNetworkDns(req, options);
  }

  async getNetworkHttp(req, options) {
    return this.adapter.getNetworkHttp(req, options);
  }

}

exports.Network = Network;