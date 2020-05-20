"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeLayer = removeLayer;
exports.appendLayer = appendLayer;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function removeLayer(opts) {
  var state = opts.state,
      trackUiEvent = opts.trackUiEvent,
      activeVisualization = opts.activeVisualization,
      layerId = opts.layerId,
      datasourceMap = opts.datasourceMap;
  var isOnlyLayer = activeVisualization.getLayerIds(state.visualization.state).every(function (id) {
    return id === opts.layerId;
  });
  trackUiEvent(isOnlyLayer ? 'layer_cleared' : 'layer_removed');
  return _objectSpread({}, state, {
    datasourceStates: _lodash.default.mapValues(state.datasourceStates, function (datasourceState, datasourceId) {
      var datasource = datasourceMap[datasourceId];
      return _objectSpread({}, datasourceState, {
        state: isOnlyLayer ? datasource.clearLayer(datasourceState.state, layerId) : datasource.removeLayer(datasourceState.state, layerId)
      });
    }),
    visualization: _objectSpread({}, state.visualization, {
      state: isOnlyLayer || !activeVisualization.removeLayer ? activeVisualization.clearLayer(state.visualization.state, layerId) : activeVisualization.removeLayer(state.visualization.state, layerId)
    }),
    stagedPreview: undefined
  });
}

function appendLayer(_ref) {
  var trackUiEvent = _ref.trackUiEvent,
      activeVisualization = _ref.activeVisualization,
      state = _ref.state,
      generateId = _ref.generateId,
      activeDatasource = _ref.activeDatasource;
  trackUiEvent('layer_added');

  if (!activeVisualization.appendLayer) {
    return state;
  }

  var layerId = generateId();
  return _objectSpread({}, state, {
    datasourceStates: _objectSpread({}, state.datasourceStates, _defineProperty({}, activeDatasource.id, _objectSpread({}, state.datasourceStates[activeDatasource.id], {
      state: activeDatasource.insertLayer(state.datasourceStates[activeDatasource.id].state, layerId)
    }))),
    visualization: _objectSpread({}, state.visualization, {
      state: activeVisualization.appendLayer(state.visualization.state, layerId)
    }),
    stagedPreview: undefined
  });
}