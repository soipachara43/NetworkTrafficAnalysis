"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ElasticsearchIndexFieldAdapter", {
  enumerable: true,
  get: function () {
    return _elasticsearch_adapter.ElasticsearchIndexFieldAdapter;
  }
});
exports.IndexFields = void 0;

var _elasticsearch_adapter = require("./elasticsearch_adapter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class IndexFields {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getFields(request, defaultIndex) {
    return this.adapter.getIndexFields(request, defaultIndex);
  }

}

exports.IndexFields = IndexFields;