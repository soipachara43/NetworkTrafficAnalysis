"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRedirect = useRedirect;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useRedirect(history, redirectLocation) {
  (0, _react.useEffect)(function () {
    if (redirectLocation) {
      history.replace(redirectLocation);
    }
  });
}