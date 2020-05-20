"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeField = void 0;

var _react = _interopRequireDefault(require("react"));

require("./time_field.css");

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
var TimeField = function TimeField(_ref) {
  var isVisible = _ref.isVisible,
      fetchTimeFields = _ref.fetchTimeFields,
      timeFieldOptions = _ref.timeFieldOptions,
      isLoading = _ref.isLoading,
      selectedTimeField = _ref.selectedTimeField,
      onTimeFieldChanged = _ref.onTimeFieldChanged;
  return _react.default.createElement(_eui.EuiForm, null, isVisible ? _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "xs",
      justifyContent: "spaceBetween",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.stepTime.fieldHeader",
      defaultMessage: "Time Filter field name"
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, isLoading ? _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "s"
    }) : _react.default.createElement(_eui.EuiLink, {
      className: "timeFieldRefreshButton",
      onClick: fetchTimeFields
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.stepTime.refreshButton",
      defaultMessage: "Refresh"
    })))),
    helpText: _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.stepTime.fieldLabel",
      defaultMessage: "The Time Filter will use this field to filter your data by time."
    })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.stepTime.fieldWarningLabel",
      defaultMessage: "You can choose not to have a time field, but you will not be able to narrow down your data by a time range."
    })))
  }, isLoading ? _react.default.createElement(_eui.EuiSelect, {
    name: "timeField",
    "data-test-subj": "createIndexPatternTimeFieldSelect",
    options: [{
      text: _i18n.i18n.translate('kbn.management.createIndexPattern.stepTime.field.loadingDropDown', {
        defaultMessage: 'Loading…'
      }),
      value: ''
    }],
    disabled: true
  }) : _react.default.createElement(_eui.EuiSelect, {
    name: "timeField",
    "data-test-subj": "createIndexPatternTimeFieldSelect",
    options: timeFieldOptions,
    isLoading: isLoading,
    disabled: isLoading,
    value: selectedTimeField,
    onChange: onTimeFieldChanged
  })) : _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.stepTime.field.noTimeFieldsLabel",
    defaultMessage: "The indices which match this index pattern don't contain any time fields."
  }))));
};

exports.TimeField = TimeField;