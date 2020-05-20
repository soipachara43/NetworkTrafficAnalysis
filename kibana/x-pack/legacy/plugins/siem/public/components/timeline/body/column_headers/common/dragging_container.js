"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggingContainer = void 0;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DraggingContainerComponent = function DraggingContainerComponent(_ref) {
  var children = _ref.children,
      onDragging = _ref.onDragging;
  (0, _react.useEffect)(function () {
    onDragging(true);
    return function () {
      return onDragging(false);
    };
  });
  return children;
};

var DraggingContainer = (0, _react.memo)(DraggingContainerComponent);
exports.DraggingContainer = DraggingContainer;