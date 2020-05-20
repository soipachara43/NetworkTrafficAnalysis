"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = void 0;

var _eui = require("@elastic/eui");

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Loading = function Loading() {
  return React.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround"
  }, React.createElement(_eui.EuiFlexItem, {
    grow: false
  }, React.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  })));
};

exports.Loading = Loading;