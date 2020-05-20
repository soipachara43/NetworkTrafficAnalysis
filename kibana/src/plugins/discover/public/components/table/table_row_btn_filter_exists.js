"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocViewTableRowBtnFilterExists = DocViewTableRowBtnFilterExists;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

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
function DocViewTableRowBtnFilterExists(_ref) {
  var onClick = _ref.onClick,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$scripted = _ref.scripted,
      scripted = _ref$scripted === void 0 ? false : _ref$scripted;
  var tooltipContent = disabled ? scripted ? _react.default.createElement(_react2.FormattedMessage, {
    id: "discover.docViews.table.unableToFilterForPresenceOfScriptedFieldsTooltip",
    defaultMessage: "Unable to filter for presence of scripted fields"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "discover.docViews.table.unableToFilterForPresenceOfMetaFieldsTooltip",
    defaultMessage: "Unable to filter for presence of meta fields"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "discover.docViews.table.filterForFieldPresentButtonTooltip",
    defaultMessage: "Filter for field present"
  });
  return _react.default.createElement(_eui.EuiToolTip, {
    content: tooltipContent
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": _i18n.i18n.translate('discover.docViews.table.filterForFieldPresentButtonAriaLabel', {
      defaultMessage: 'Filter for field present'
    }),
    onClick: onClick,
    className: "kbnDocViewer__actionButton",
    "data-test-subj": "addExistsFilterButton",
    disabled: disabled,
    iconType: 'indexOpen',
    iconSize: 's'
  }));
}