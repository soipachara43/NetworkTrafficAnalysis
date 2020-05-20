"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPreviewExpression = toPreviewExpression;
exports.getScaleType = getScaleType;
exports.buildExpression = exports.toExpression = void 0;

var _charts = require("@elastic/charts");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function xyTitles(layer, frame) {
  var defaults = {
    xTitle: 'x',
    yTitle: 'y'
  };

  if (!layer || !layer.accessors.length) {
    return defaults;
  }

  var datasource = frame.datasourceLayers[layer.layerId];

  if (!datasource) {
    return defaults;
  }

  var x = layer.xAccessor ? datasource.getOperationForColumnId(layer.xAccessor) : null;
  var y = layer.accessors[0] ? datasource.getOperationForColumnId(layer.accessors[0]) : null;
  return {
    xTitle: x ? x.label : defaults.xTitle,
    yTitle: y ? y.label : defaults.yTitle
  };
}

var toExpression = function toExpression(state, frame) {
  if (!state || !state.layers.length) {
    return null;
  }

  var metadata = {};
  state.layers.forEach(function (layer) {
    metadata[layer.layerId] = {};
    var datasource = frame.datasourceLayers[layer.layerId];
    datasource.getTableSpec().forEach(function (column) {
      var operation = frame.datasourceLayers[layer.layerId].getOperationForColumnId(column.columnId);
      metadata[layer.layerId][column.columnId] = operation;
    });
  });
  return buildExpression(state, metadata, frame, xyTitles(state.layers[0], frame));
};

exports.toExpression = toExpression;

function toPreviewExpression(state, frame) {
  return toExpression(_objectSpread({}, state, {
    layers: state.layers.map(function (layer) {
      return _objectSpread({}, layer, {
        hide: true
      });
    }),
    // hide legend for preview
    legend: _objectSpread({}, state.legend, {
      isVisible: false
    })
  }), frame);
}

function getScaleType(metadata, defaultScale) {
  if (!metadata) {
    return defaultScale;
  } // use scale information if available


  if (metadata.scale === 'ordinal') {
    return _charts.ScaleType.Ordinal;
  }

  if (metadata.scale === 'interval' || metadata.scale === 'ratio') {
    return metadata.dataType === 'date' ? _charts.ScaleType.Time : _charts.ScaleType.Linear;
  } // fall back to data type if necessary


  switch (metadata.dataType) {
    case 'boolean':
    case 'string':
    case 'ip':
      return _charts.ScaleType.Ordinal;

    case 'date':
      return _charts.ScaleType.Time;

    default:
      return _charts.ScaleType.Linear;
  }
}

var buildExpression = function buildExpression(state, metadata, frame) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    xTitle: '',
    yTitle: ''
  },
      xTitle = _ref.xTitle,
      yTitle = _ref.yTitle;

  var validLayers = state.layers.filter(function (layer) {
    return Boolean(layer.xAccessor && layer.accessors.length);
  });

  if (!validLayers.length) {
    return null;
  }

  return {
    type: 'expression',
    chain: [{
      type: 'function',
      function: 'lens_xy_chart',
      arguments: {
        xTitle: [xTitle],
        yTitle: [yTitle],
        legend: [{
          type: 'expression',
          chain: [{
            type: 'function',
            function: 'lens_xy_legendConfig',
            arguments: {
              isVisible: [state.legend.isVisible],
              position: [state.legend.position]
            }
          }]
        }],
        layers: validLayers.map(function (layer) {
          var columnToLabel = {};

          if (frame) {
            var datasource = frame.datasourceLayers[layer.layerId];
            layer.accessors.concat(layer.splitAccessor ? [layer.splitAccessor] : []).forEach(function (accessor) {
              var operation = datasource.getOperationForColumnId(accessor);

              if (operation && operation.label) {
                columnToLabel[accessor] = operation.label;
              }
            });
          }

          var xAxisOperation = frame && frame.datasourceLayers[layer.layerId].getOperationForColumnId(layer.xAccessor);
          var isHistogramDimension = Boolean(xAxisOperation && xAxisOperation.isBucketed && xAxisOperation.scale && xAxisOperation.scale !== 'ordinal');
          return {
            type: 'expression',
            chain: [{
              type: 'function',
              function: 'lens_xy_layer',
              arguments: {
                layerId: [layer.layerId],
                hide: [Boolean(layer.hide)],
                xAccessor: [layer.xAccessor],
                yScaleType: [getScaleType(metadata[layer.layerId][layer.accessors[0]], _charts.ScaleType.Ordinal)],
                xScaleType: [getScaleType(metadata[layer.layerId][layer.xAccessor], _charts.ScaleType.Linear)],
                isHistogram: [isHistogramDimension],
                splitAccessor: layer.splitAccessor ? [layer.splitAccessor] : [],
                seriesType: [layer.seriesType],
                accessors: layer.accessors,
                columnToLabel: [JSON.stringify(columnToLabel)]
              }
            }]
          };
        })
      }
    }]
  };
};

exports.buildExpression = buildExpression;