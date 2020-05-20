"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueAxesPanel = ValueAxesPanel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _value_axis_options = require("./value_axis_options");

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
function ValueAxesPanel(props) {
  var addValueAxis = props.addValueAxis,
      removeValueAxis = props.removeValueAxis,
      seriesParams = props.seriesParams,
      valueAxes = props.valueAxes;
  var getSeries = (0, _react.useCallback)(function (axis) {
    var isFirst = valueAxes[0].id === axis.id;
    var series = seriesParams.filter(function (serie) {
      return serie.valueAxis === axis.id || isFirst && !serie.valueAxis;
    });
    return series.map(function (serie) {
      return serie.data.label;
    }).join(', ');
  }, [seriesParams, valueAxes]);
  var removeButtonTooltip = (0, _react.useMemo)(function () {
    return _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.removeButtonTooltip', {
      defaultMessage: 'Remove Y-axis'
    });
  }, []);
  var renderRemoveButton = (0, _react.useCallback)(function (axis) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "bottom",
      content: removeButtonTooltip
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      color: "danger",
      iconType: "cross",
      onClick: function onClick() {
        return removeValueAxis(axis);
      },
      "aria-label": removeButtonTooltip,
      "data-test-subj": "removeValueAxisBtn"
    }));
  }, [removeValueAxis, removeButtonTooltip]);
  var addButtonTooltip = (0, _react.useMemo)(function () {
    return _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.addButtonTooltip', {
      defaultMessage: 'Add Y-axis'
    });
  }, []);
  var getButtonContent = (0, _react.useCallback)(function (axis) {
    var description = getSeries(axis);
    return _react.default.createElement(_react.default.Fragment, null, axis.name, ' ', _react.default.createElement(_eui.EuiToolTip, {
      content: description
    }, _react.default.createElement(_react.default.Fragment, null, description)));
  }, [getSeries]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    justifyContent: "spaceBetween",
    alignItems: "baseline"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeVislib.controls.pointSeries.valueAxes.yAxisTitle",
    defaultMessage: "Y-axes"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "bottom",
    content: addButtonTooltip
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "plusInCircleFilled",
    onClick: addValueAxis,
    "aria-label": addButtonTooltip,
    "data-test-subj": "visualizeAddYAxisButton"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), valueAxes.map(function (axis, index) {
    return _react.default.createElement(_eui.EuiAccordion, {
      id: "yAxisAccordion".concat(axis.id),
      key: axis.id,
      "data-test-subj": "toggleYAxisOptions-".concat(axis.id),
      className: "visEditorSidebar__section visEditorSidebar__collapsible",
      initialIsOpen: false,
      buttonContent: getButtonContent(axis),
      buttonClassName: "eui-textTruncate",
      buttonContentClassName: "visEditorSidebar__aggGroupAccordionButtonContent eui-textTruncate",
      "aria-label": _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.toggleOptionsAriaLabel', {
        defaultMessage: 'Toggle {axisName} options',
        values: {
          axisName: axis.name
        }
      }),
      extraAction: valueAxes.length === 1 ? undefined : renderRemoveButton(axis)
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_value_axis_options.ValueAxisOptions, {
      axis: axis,
      index: index,
      valueAxis: valueAxes[index],
      isCategoryAxisHorizontal: props.isCategoryAxisHorizontal,
      onValueAxisPositionChanged: props.onValueAxisPositionChanged,
      setParamByIndex: props.setParamByIndex,
      setMultipleValidity: props.setMultipleValidity,
      vis: props.vis
    })));
  }));
}