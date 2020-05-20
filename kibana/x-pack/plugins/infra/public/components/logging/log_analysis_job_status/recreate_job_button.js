"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecreateJobButton = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RecreateJobButton = function RecreateJobButton(props) {
  return _react2.default.createElement(_eui.EuiButton, props, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.analysis.recreateJobButtonLabel",
    defaultMessage: "Recreate ML job"
  }));
};

exports.RecreateJobButton = RecreateJobButton;