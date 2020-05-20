"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopNavMenu = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

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
var TopNavMenu = function TopNavMenu(_ref) {
  var items = _ref.items,
      disabled = _ref.disabled;
  return _react.default.createElement(_eui.EuiTabs, {
    size: "s"
  }, items.map(function (item, idx) {
    return _react.default.createElement(_eui.EuiTab, {
      key: idx,
      disabled: disabled,
      onClick: item.onClick,
      title: item.label,
      "data-test-subj": item.testId
    }, item.label);
  }));
};

exports.TopNavMenu = TopNavMenu;