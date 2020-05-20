"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizeTitleForm = CustomizeTitleForm;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

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
function CustomizeTitleForm(_ref) {
  var title = _ref.title,
      onReset = _ref.onReset,
      onUpdatePanelTitle = _ref.onUpdatePanelTitle;

  function onInputChange(event) {
    onUpdatePanelTitle(event.target.value);
  }

  return _react.default.createElement("div", {
    className: "embPanel__optionsMenuForm",
    "data-test-subj": "dashboardPanelTitleInputMenuItem"
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('embeddableApi.customizeTitle.optionsMenuForm.panelTitleFormRowLabel', {
      defaultMessage: 'Panel title'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    id: "panelTitleInput",
    "data-test-subj": "customEmbeddablePanelTitleInput",
    name: "min",
    type: "text",
    value: title,
    onChange: onInputChange,
    "aria-label": _i18n.i18n.translate('embeddableApi.customizeTitle.optionsMenuForm.panelTitleInputAriaLabel', {
      defaultMessage: 'Changes to this input are applied immediately. Press enter to exit.'
    })
  })), _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "resetCustomEmbeddablePanelTitle",
    onClick: onReset
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "embeddableApi.customizeTitle.optionsMenuForm.resetCustomDashboardButtonLabel",
    defaultMessage: "Reset title"
  })));
}