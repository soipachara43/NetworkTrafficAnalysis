"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueAxisOptions = ValueAxisOptions;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _collections = require("../../../utils/collections");

var _common = require("../../common");

var _label_options = require("./label_options");

var _custom_extents_options = require("./custom_extents_options");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ValueAxisOptions(_ref) {
  var axis = _ref.axis,
      index = _ref.index,
      isCategoryAxisHorizontal = _ref.isCategoryAxisHorizontal,
      valueAxis = _ref.valueAxis,
      vis = _ref.vis,
      onValueAxisPositionChanged = _ref.onValueAxisPositionChanged,
      setParamByIndex = _ref.setParamByIndex,
      setMultipleValidity = _ref.setMultipleValidity;
  var setValueAxis = (0, _react.useCallback)(function (paramName, value) {
    return setParamByIndex('valueAxes', index, paramName, value);
  }, [setParamByIndex, index]);
  var setValueAxisTitle = (0, _react.useCallback)(function (paramName, value) {
    var title = _objectSpread({}, valueAxis.title, _defineProperty({}, paramName, value));

    setParamByIndex('valueAxes', index, 'title', title);
  }, [valueAxis.title, setParamByIndex, index]);
  var setValueAxisScale = (0, _react.useCallback)(function (paramName, value) {
    var scale = _objectSpread({}, valueAxis.scale, _defineProperty({}, paramName, value));

    setParamByIndex('valueAxes', index, 'scale', scale);
  }, [valueAxis.scale, setParamByIndex, index]);
  var setAxisLabel = (0, _react.useCallback)(function (paramName, value) {
    var labels = _objectSpread({}, valueAxis.labels, _defineProperty({}, paramName, value));

    setParamByIndex('valueAxes', index, 'labels', labels);
  }, [valueAxis.labels, setParamByIndex, index]);
  var onPositionChanged = (0, _react.useCallback)(function (paramName, value) {
    onValueAxisPositionChanged(index, value);
  }, [index, onValueAxisPositionChanged]);
  var isPositionDisabled = (0, _react.useCallback)(function (position) {
    if (isCategoryAxisHorizontal) {
      return (0, _utils.isAxisHorizontal)(position);
    }

    return [_collections.Positions.LEFT, _collections.Positions.RIGHT].includes(position);
  }, [isCategoryAxisHorizontal]);
  var positions = (0, _react.useMemo)(function () {
    return vis.type.editorConfig.collections.positions.map(function (position) {
      return _objectSpread({}, position, {
        disabled: isPositionDisabled(position.value)
      });
    });
  }, [vis.type.editorConfig.collections.positions, isPositionDisabled]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.positionLabel', {
      defaultMessage: 'Position'
    }),
    options: positions,
    paramName: "position",
    value: axis.position,
    setValue: onPositionChanged
  }), _react.default.createElement(_common.SelectOption, {
    id: "valueAxisMode".concat(index),
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.modeLabel', {
      defaultMessage: 'Mode'
    }),
    options: vis.type.editorConfig.collections.axisModes,
    paramName: "mode",
    value: axis.scale.mode,
    setValue: setValueAxisScale
  }), _react.default.createElement(_common.SelectOption, {
    id: "scaleSelectYAxis-".concat(axis.id),
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.scaleTypeLabel', {
      defaultMessage: 'Scale type'
    }),
    options: vis.type.editorConfig.collections.scaleTypes,
    paramName: "type",
    value: axis.scale.type,
    setValue: setValueAxisScale
  }), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.showLabel', {
      defaultMessage: 'Show axis lines and labels'
    }),
    "data-test-subj": "valueAxisShow-".concat(axis.id),
    paramName: "show",
    value: axis.show,
    setValue: setValueAxis
  }), axis.show ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_common.TextInputOption, {
    "data-test-subj": "valueAxisTitle".concat(index),
    label: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.titleLabel', {
      defaultMessage: 'Title'
    }),
    paramName: "text",
    value: axis.title.text,
    setValue: setValueAxisTitle
  }), _react.default.createElement(_label_options.LabelOptions, {
    axisLabels: axis.labels,
    axisFilterCheckboxName: "yAxisFilterLabelsCheckbox".concat(axis.id),
    setAxisLabel: setAxisLabel
  })) : _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "s"
  }), _react.default.createElement(_eui.EuiAccordion, {
    id: "yAxisOptionsAccordion".concat(axis.id),
    className: "visEditorSidebar__section visEditorSidebar__collapsible",
    initialIsOpen: false,
    buttonContentClassName: "euiText euiText--small",
    buttonContent: _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.customExtentsLabel', {
      defaultMessage: 'Custom extents'
    }),
    "aria-label": _i18n.i18n.translate('visTypeVislib.controls.pointSeries.valueAxes.toggleCustomExtendsAriaLabel', {
      defaultMessage: 'Toggle custom extents'
    })
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_custom_extents_options.CustomExtentsOptions, {
    axisScale: axis.scale,
    setMultipleValidity: setMultipleValidity,
    setValueAxisScale: setValueAxisScale,
    setValueAxis: setValueAxis
  }))));
}