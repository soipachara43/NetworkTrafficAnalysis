"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

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
var Header = function Header(_ref) {
  var canEdit = _ref.canEdit,
      canDelete = _ref.canDelete,
      canViewInApp = _ref.canViewInApp,
      type = _ref.type,
      viewUrl = _ref.viewUrl,
      onDeleteClick = _ref.onDeleteClick;
  return _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, canEdit ? _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.objects.view.editItemTitle",
    defaultMessage: "Edit {title}",
    values: {
      title: type
    }
  })) : _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.objects.view.viewItemTitle",
    defaultMessage: "View {title}",
    values: {
      title: type
    }
  })))), _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false
  }, canViewInApp && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    href: viewUrl,
    iconType: "eye",
    "data-test-subj": "savedObjectEditViewInApp"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.objects.view.viewItemButtonLabel",
    defaultMessage: "View {title}",
    values: {
      title: type
    }
  }))), canDelete && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    color: "danger",
    size: "s",
    iconType: "trash",
    onClick: function onClick() {
      return onDeleteClick();
    },
    "data-test-subj": "savedObjectEditDelete"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.objects.view.deleteItemButtonLabel",
    defaultMessage: "Delete {title}",
    values: {
      title: type
    }
  }))))));
};

exports.Header = Header;