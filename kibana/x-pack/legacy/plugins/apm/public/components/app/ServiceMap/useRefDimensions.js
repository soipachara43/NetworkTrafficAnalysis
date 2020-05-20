"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefDimensions = useRefDimensions;

var _react = require("react");

var _reactUse = require("react-use");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useRefDimensions() {
  var ref = (0, _react.useRef)(null);
  var windowHeight = (0, _reactUse.useWindowSize)().height;

  if (!ref.current) {
    return {
      ref: ref,
      width: 0,
      height: 0
    };
  }

  var _ref$current$getBound = ref.current.getBoundingClientRect(),
      top = _ref$current$getBound.top,
      width = _ref$current$getBound.width;

  var height = windowHeight - top;
  return {
    ref: ref,
    width: width,
    height: height
  };
}