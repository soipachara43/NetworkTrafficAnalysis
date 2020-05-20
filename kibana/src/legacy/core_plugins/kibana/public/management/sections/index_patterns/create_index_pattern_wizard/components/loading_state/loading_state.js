"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingState = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var LoadingState = function LoadingState() {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    alignItems: "center",
    direction: "column",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", {
    style: {
      textAlign: 'center'
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.loadingState.checkingLabel",
    defaultMessage: "Checking for Elasticsearch data"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "l"
  })));
};

exports.LoadingState = LoadingState;