"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelOptions = LabelOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

var _collections = require("../../../utils/collections");

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
function LabelOptions(_ref) {
  var axisLabels = _ref.axisLabels,
      axisFilterCheckboxName = _ref.axisFilterCheckboxName,
      setAxisLabel = _ref.setAxisLabel;
  var setAxisLabelRotate = (0, _react.useCallback)(function (paramName, value) {
    setAxisLabel(paramName, Number(value));
  }, [setAxisLabel]);
  var rotateOptions = (0, _react.useMemo)(_collections.getRotateOptions, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeVislib.controls.pointSeries.categoryAxis.labelsTitle",
    defaultMessage: "Labels"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.categoryAxis.showLabelsLabel', {
      defaultMessage: 'Show labels'
    }),
    paramName: "show",
    value: axisLabels.show,
    setValue: setAxisLabel
  }), _react.default.createElement(_common.SwitchOption, {
    "data-test-subj": axisFilterCheckboxName,
    disabled: !axisLabels.show,
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.categoryAxis.filterLabelsLabel', {
      defaultMessage: 'Filter labels'
    }),
    paramName: "filter",
    value: axisLabels.filter,
    setValue: setAxisLabel
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.SelectOption, {
    disabled: !axisLabels.show,
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.categoryAxis.alignLabel', {
      defaultMessage: 'Align'
    }),
    options: rotateOptions,
    paramName: "rotate",
    value: axisLabels.rotate,
    setValue: setAxisLabelRotate
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.TruncateLabelsOption, {
    disabled: !axisLabels.show,
    value: axisLabels.truncate,
    setValue: setAxisLabel
  }))));
}