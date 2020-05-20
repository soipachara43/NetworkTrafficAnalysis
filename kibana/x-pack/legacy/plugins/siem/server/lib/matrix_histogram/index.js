"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  MatrixHistogram: true
};
exports.MatrixHistogram = void 0;

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

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class MatrixHistogram {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getMatrixHistogramData(req, options) {
    return this.adapter.getHistogramData(req, options);
  }

}

exports.MatrixHistogram = MatrixHistogram;