"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallOuts = void 0;

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
var CallOuts = function CallOuts() {
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "advancedSettings.callOutCautionTitle",
      defaultMessage: "Caution: You can break stuff here"
    }),
    color: "warning",
    iconType: "bolt"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "advancedSettings.callOutCautionDescription",
    defaultMessage: "Be careful in here, these settings are for very advanced users only. Tweaks you make here can break large portions of Kibana. Some of these settings may be undocumented, unsupported or experimental. If a field has a default value, blanking the field will reset it to its default which may be unacceptable given other configuration directives. Deleting a custom setting will permanently remove it from Kibana's config."
  }))));
};

exports.CallOuts = CallOuts;