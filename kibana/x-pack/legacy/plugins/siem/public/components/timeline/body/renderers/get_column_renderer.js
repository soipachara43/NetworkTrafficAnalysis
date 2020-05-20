"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnRenderer = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var unhandledColumnRenderer = function unhandledColumnRenderer() {
  throw new Error('Unhandled Column Renderer');
};

var getColumnRenderer = function getColumnRenderer(columnName, columnRenderers, data) {
  var renderer = columnRenderers.find(function (columnRenderer) {
    return columnRenderer.isInstance(columnName, data);
  });
  return renderer != null ? renderer : unhandledColumnRenderer();
};

exports.getColumnRenderer = getColumnRenderer;