"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRowRenderer = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var unhandledRowRenderer = function unhandledRowRenderer() {
  throw new Error('Unhandled Row Renderer');
};

var getRowRenderer = function getRowRenderer(ecs, rowRenderers) {
  var renderer = rowRenderers.find(function (rowRenderer) {
    return rowRenderer.isInstance(ecs);
  });

  if (renderer == null) {
    return unhandledRowRenderer();
  } else {
    return renderer;
  }
};

exports.getRowRenderer = getRowRenderer;