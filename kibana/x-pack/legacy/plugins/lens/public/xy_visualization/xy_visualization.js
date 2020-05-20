"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xyVisualization = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactDom = require("react-dom");

var _charts = require("@elastic/charts");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _xy_suggestions = require("./xy_suggestions");

var _xy_config_panel = require("./xy_config_panel");

var _types = require("./types");

var _to_expression = require("./to_expression");

var _chart_bar_stacked = _interopRequireDefault(require("../assets/chart_bar_stacked.svg"));

var _chart_mixed_xy = _interopRequireDefault(require("../assets/chart_mixed_xy.svg"));

var _state_helpers = require("./state_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultIcon = _chart_bar_stacked.default;
var defaultSeriesType = 'bar_stacked';

var isNumericMetric = function isNumericMetric(op) {
  return !op.isBucketed && op.dataType === 'number';
};

var isBucketed = function isBucketed(op) {
  return op.isBucketed;
};

function _getDescription(state) {
  if (!state) {
    return {
      icon: defaultIcon,
      label: _i18n.i18n.translate('xpack.lens.xyVisualization.xyLabel', {
        defaultMessage: 'XY'
      })
    };
  }

  if (!state.layers.length) {
    var _visualizationType = _types.visualizationTypes.find(function (v) {
      return v.id === state.preferredSeriesType;
    });

    return {
      icon: _visualizationType.largeIcon || _visualizationType.icon,
      label: _visualizationType.label
    };
  }

  var visualizationType = _types.visualizationTypes.find(function (t) {
    return t.id === state.layers[0].seriesType;
  });

  var seriesTypes = _lodash.default.unique(state.layers.map(function (l) {
    return l.seriesType;
  }));

  return {
    icon: seriesTypes.length === 1 ? visualizationType.largeIcon || visualizationType.icon : _chart_mixed_xy.default,
    label: seriesTypes.length === 1 ? visualizationType.label : (0, _state_helpers.isHorizontalChart)(state.layers) ? _i18n.i18n.translate('xpack.lens.xyVisualization.mixedBarHorizontalLabel', {
      defaultMessage: 'Mixed horizontal bar'
    }) : _i18n.i18n.translate('xpack.lens.xyVisualization.mixedLabel', {
      defaultMessage: 'Mixed XY'
    })
  };
}

var xyVisualization = {
  id: 'lnsXY',
  visualizationTypes: _types.visualizationTypes,
  getLayerIds: function getLayerIds(state) {
    return state.layers.map(function (l) {
      return l.layerId;
    });
  },
  removeLayer: function removeLayer(state, layerId) {
    return _objectSpread({}, state, {
      layers: state.layers.filter(function (l) {
        return l.layerId !== layerId;
      })
    });
  },
  appendLayer: function appendLayer(state, layerId) {
    var usedSeriesTypes = _lodash.default.uniq(state.layers.map(function (layer) {
      return layer.seriesType;
    }));

    return _objectSpread({}, state, {
      layers: [].concat(_toConsumableArray(state.layers), [newLayerState(usedSeriesTypes.length === 1 ? usedSeriesTypes[0] : state.preferredSeriesType, layerId)])
    });
  },
  clearLayer: function clearLayer(state, layerId) {
    return _objectSpread({}, state, {
      layers: state.layers.map(function (l) {
        return l.layerId !== layerId ? l : newLayerState(state.preferredSeriesType, layerId);
      })
    });
  },
  getDescription: function getDescription(state) {
    var _getDescription2 = _getDescription(state),
        icon = _getDescription2.icon,
        label = _getDescription2.label;

    var chartLabel = _i18n.i18n.translate('xpack.lens.xyVisualization.chartLabel', {
      defaultMessage: '{label} chart',
      values: {
        label: label
      }
    });

    return {
      icon: icon || defaultIcon,
      label: chartLabel
    };
  },
  switchVisualizationType: function switchVisualizationType(seriesType, state) {
    return _objectSpread({}, state, {
      preferredSeriesType: seriesType,
      layers: state.layers.map(function (layer) {
        return _objectSpread({}, layer, {
          seriesType: seriesType
        });
      })
    });
  },
  getSuggestions: _xy_suggestions.getSuggestions,
  initialize: function initialize(frame, state) {
    return state || {
      title: 'Empty XY chart',
      legend: {
        isVisible: true,
        position: _charts.Position.Right
      },
      preferredSeriesType: defaultSeriesType,
      layers: [{
        layerId: frame.addNewLayer(),
        accessors: [],
        position: _charts.Position.Top,
        seriesType: defaultSeriesType,
        showGridlines: false
      }]
    };
  },
  getPersistableState: function getPersistableState(state) {
    return state;
  },
  getConfiguration: function getConfiguration(props) {
    var layer = props.state.layers.find(function (l) {
      return l.layerId === props.layerId;
    });
    return {
      groups: [{
        groupId: 'x',
        groupLabel: _i18n.i18n.translate('xpack.lens.xyChart.xAxisLabel', {
          defaultMessage: 'X-axis'
        }),
        accessors: layer.xAccessor ? [layer.xAccessor] : [],
        filterOperations: isBucketed,
        suggestedPriority: 1,
        supportsMoreColumns: !layer.xAccessor,
        required: true,
        dataTestSubj: 'lnsXY_xDimensionPanel'
      }, {
        groupId: 'y',
        groupLabel: _i18n.i18n.translate('xpack.lens.xyChart.yAxisLabel', {
          defaultMessage: 'Y-axis'
        }),
        accessors: layer.accessors,
        filterOperations: isNumericMetric,
        supportsMoreColumns: true,
        required: true,
        dataTestSubj: 'lnsXY_yDimensionPanel'
      }, {
        groupId: 'breakdown',
        groupLabel: _i18n.i18n.translate('xpack.lens.xyChart.splitSeries', {
          defaultMessage: 'Break down by'
        }),
        accessors: layer.splitAccessor ? [layer.splitAccessor] : [],
        filterOperations: isBucketed,
        suggestedPriority: 0,
        supportsMoreColumns: !layer.splitAccessor,
        dataTestSubj: 'lnsXY_splitDimensionPanel'
      }]
    };
  },
  setDimension: function setDimension(_ref) {
    var prevState = _ref.prevState,
        layerId = _ref.layerId,
        columnId = _ref.columnId,
        groupId = _ref.groupId;
    var newLayer = prevState.layers.find(function (l) {
      return l.layerId === layerId;
    });

    if (!newLayer) {
      return prevState;
    }

    if (groupId === 'x') {
      newLayer.xAccessor = columnId;
    }

    if (groupId === 'y') {
      newLayer.accessors = [].concat(_toConsumableArray(newLayer.accessors.filter(function (a) {
        return a !== columnId;
      })), [columnId]);
    }

    if (groupId === 'breakdown') {
      newLayer.splitAccessor = columnId;
    }

    return _objectSpread({}, prevState, {
      layers: prevState.layers.map(function (l) {
        return l.layerId === layerId ? newLayer : l;
      })
    });
  },
  removeDimension: function removeDimension(_ref2) {
    var prevState = _ref2.prevState,
        layerId = _ref2.layerId,
        columnId = _ref2.columnId;
    var newLayer = prevState.layers.find(function (l) {
      return l.layerId === layerId;
    });

    if (!newLayer) {
      return prevState;
    }

    if (newLayer.xAccessor === columnId) {
      delete newLayer.xAccessor;
    } else if (newLayer.splitAccessor === columnId) {
      delete newLayer.splitAccessor;
    } else if (newLayer.accessors.includes(columnId)) {
      newLayer.accessors = newLayer.accessors.filter(function (a) {
        return a !== columnId;
      });
    }

    return _objectSpread({}, prevState, {
      layers: prevState.layers.map(function (l) {
        return l.layerId === layerId ? newLayer : l;
      })
    });
  },
  getLayerContextMenuIcon: function getLayerContextMenuIcon(_ref3) {
    var _visualizationTypes$f;

    var state = _ref3.state,
        layerId = _ref3.layerId;
    var layer = state.layers.find(function (l) {
      return l.layerId === layerId;
    });
    return (_visualizationTypes$f = _types.visualizationTypes.find(function (t) {
      return t.id === (layer === null || layer === void 0 ? void 0 : layer.seriesType);
    })) === null || _visualizationTypes$f === void 0 ? void 0 : _visualizationTypes$f.icon;
  },
  renderLayerContextMenu: function renderLayerContextMenu(domElement, props) {
    (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_xy_config_panel.LayerContextMenu, props)), domElement);
  },
  toExpression: _to_expression.toExpression,
  toPreviewExpression: _to_expression.toPreviewExpression
};
exports.xyVisualization = xyVisualization;

function newLayerState(seriesType, layerId) {
  return {
    layerId: layerId,
    seriesType: seriesType,
    accessors: []
  };
}