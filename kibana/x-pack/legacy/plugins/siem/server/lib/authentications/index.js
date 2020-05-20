"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authentications = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class Authentications {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getAuthentications(req, options) {
    return this.adapter.getAuthentications(req, options);
  }

}

exports.Authentications = Authentications;