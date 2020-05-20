"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
  var prompt = _ref.prompt,
      indexPatternName = _ref.indexPatternName,
      _ref$showSystemIndice = _ref.showSystemIndices,
      showSystemIndices = _ref$showSystemIndice === void 0 ? false : _ref$showSystemIndice,
      isIncludingSystemIndices = _ref.isIncludingSystemIndices,
      onChangeIncludingSystemIndices = _ref.onChangeIncludingSystemIndices,
      _ref$isBeta = _ref.isBeta,
      isBeta = _ref$isBeta === void 0 ? false : _ref$isBeta;
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPatternHeader",
    defaultMessage: "Create {indexPatternName}",
    values: {
      indexPatternName: indexPatternName
    }
  }), isBeta ? _react.default.createElement(_react.Fragment, null, ' ', _react.default.createElement(_eui.EuiBetaBadge, {
    label: _i18n.i18n.translate('kbn.management.createIndexPattern.betaLabel', {
      defaultMessage: 'Beta'
    })
  })) : null)), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, _react.default.createElement(_eui.EuiTextColor, {
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPatternLabel",
    defaultMessage: "Kibana uses index patterns to retrieve data from Elasticsearch indices for things like visualizations."
  }))))), showSystemIndices ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.includeSystemIndicesToggleSwitchLabel",
      defaultMessage: "Include system indices"
    }),
    id: "checkboxShowSystemIndices",
    checked: isIncludingSystemIndices,
    onChange: onChangeIncludingSystemIndices
  })) : null), prompt ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), prompt) : null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};

exports.Header = Header;