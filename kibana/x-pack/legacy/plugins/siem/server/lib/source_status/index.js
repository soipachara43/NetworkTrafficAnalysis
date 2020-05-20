"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ElasticsearchSourceStatusAdapter", {
  enumerable: true,
  get: function () {
    return _elasticsearch_adapter.ElasticsearchSourceStatusAdapter;
  }
});
exports.SourceStatus = void 0;

var _elasticsearch_adapter = require("./elasticsearch_adapter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class SourceStatus {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async hasIndices(request, indexes) {
    return this.adapter.hasIndices(request, indexes);
  }

}

exports.SourceStatus = SourceStatus;