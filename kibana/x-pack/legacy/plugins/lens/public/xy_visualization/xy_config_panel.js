"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayerContextMenu = LayerContextMenu;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _types = require("./types");

var _state_helpers = require("./state_helpers");

var _lens_ui_telemetry = require("../lens_ui_telemetry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function updateLayer(state, layer, index) {
  var newLayers = _toConsumableArray(state.layers);

  newLayers[index] = layer;
  return _objectSpread({}, state, {
    layers: newLayers
  });
}

function LayerContextMenu(props) {
  var state = props.state,
      layerId = props.layerId;
  var horizontalOnly = (0, _state_helpers.isHorizontalChart)(state.layers);
  var index = state.layers.findIndex(function (l) {
    return l.layerId === layerId;
  });
  var layer = state.layers[index];

  if (!layer) {
    return null;
  }

  return _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.lens.xyChart.chartTypeLabel', {
      defaultMessage: 'Chart type'
    })
  }, _react.default.createElement(_eui.EuiButtonGroup, {
    legend: _i18n.i18n.translate('xpack.lens.xyChart.chartTypeLegend', {
      defaultMessage: 'Chart type'
    }),
    name: "chartType",
    className: "eui-displayInlineBlock",
    "data-test-subj": "lnsXY_seriesType",
    options: _types.visualizationTypes.filter(function (t) {
      return (0, _state_helpers.isHorizontalSeries)(t.id) === horizontalOnly;
    }).map(function (t) {
      return {
        id: t.id,
        label: t.label,
        iconType: t.icon || 'empty'
      };
    }),
    idSelected: layer.seriesType,
    onChange: function onChange(seriesType) {
      (0, _lens_ui_telemetry.trackUiEvent)('xy_change_layer_display');
      props.setState(updateLayer(state, _objectSpread({}, layer, {
        seriesType: seriesType
      }), index));
    },
    isIconOnly: true,
    buttonSize: "compressed"
  }));
}