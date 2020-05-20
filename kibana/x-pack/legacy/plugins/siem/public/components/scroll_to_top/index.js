"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollToTop = void 0;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useScrollToTop = function useScrollToTop() {
  (0, _react.useEffect)(function () {
    // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    if (window.scroll) {
      window.scroll(0, 0);
    } else {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }); // renders nothing, since nothing is needed

  return null;
};

exports.useScrollToTop = useScrollToTop;