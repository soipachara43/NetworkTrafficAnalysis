"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedOptions = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

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
var AdvancedOptions = function AdvancedOptions(_ref) {
  var isVisible = _ref.isVisible,
      indexPatternId = _ref.indexPatternId,
      toggleAdvancedOptions = _ref.toggleAdvancedOptions,
      onChangeIndexPatternId = _ref.onChangeIndexPatternId;
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: isVisible ? 'arrowDown' : 'arrowRight',
    onClick: toggleAdvancedOptions
  }, isVisible ? _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.stepTime.options.hideButton",
    defaultMessage: "Hide advanced options"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.stepTime.options.showButton",
    defaultMessage: "Show advanced options"
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), isVisible ? _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.stepTime.options.patternHeader",
      defaultMessage: "Custom index pattern ID"
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.stepTime.options.patternLabel",
      defaultMessage: "Kibana will provide a unique identifier for each index pattern. If you do not want to use this unique ID, enter a custom one."
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "indexPatternId",
    "data-test-subj": "createIndexPatternIdInput",
    value: indexPatternId,
    onChange: onChangeIndexPatternId,
    placeholder: _i18n.i18n.translate('kbn.management.createIndexPattern.stepTime.options.patternPlaceholder', {
      defaultMessage: 'custom-index-pattern-id'
    })
  }))) : null);
};

exports.AdvancedOptions = AdvancedOptions;