"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorFrame = EditorFrame;

var _react = _interopRequireWildcard(require("react"));

var _state_management = require("./state_management");

var _data_panel_wrapper = require("./data_panel_wrapper");

var _config_panel_wrapper = require("./config_panel_wrapper");

var _frame_layout = require("./frame_layout");

var _suggestion_panel = require("./suggestion_panel");

var _workspace_panel = require("./workspace_panel");

var _drag_drop = require("../../drag_drop");

var _save = require("./save");

var _workspace_panel_wrapper = require("./workspace_panel_wrapper");

var _id_generator = require("../../id_generator");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function EditorFrame(props) {
  var _useReducer = (0, _react.useReducer)(_state_management.reducer, props, _state_management.getInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var onError = props.onError;
  var activeVisualization = state.visualization.activeId && props.visualizationMap[state.visualization.activeId];
  var allLoaded = Object.values(state.datasourceStates).every(function (_ref) {
    var isLoading = _ref.isLoading;
    return typeof isLoading === 'boolean' && !isLoading;
  }); // Initialize current datasource and all active datasources

  (0, _react.useEffect)(function () {
    if (!allLoaded) {
      Object.entries(props.datasourceMap).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            datasourceId = _ref3[0],
            datasource = _ref3[1];

        if (state.datasourceStates[datasourceId] && state.datasourceStates[datasourceId].isLoading) {
          datasource.initialize(state.datasourceStates[datasourceId].state || undefined).then(function (datasourceState) {
            dispatch({
              type: 'UPDATE_DATASOURCE_STATE',
              updater: datasourceState,
              datasourceId: datasourceId
            });
          }).catch(onError);
        }
      });
    }
  }, [allLoaded]);
  var datasourceLayers = {};
  Object.keys(props.datasourceMap).filter(function (id) {
    return state.datasourceStates[id] && !state.datasourceStates[id].isLoading;
  }).forEach(function (id) {
    var datasourceState = state.datasourceStates[id].state;
    var datasource = props.datasourceMap[id];
    var layers = datasource.getLayers(datasourceState);
    layers.forEach(function (layer) {
      datasourceLayers[layer] = props.datasourceMap[id].getPublicAPI({
        state: datasourceState,
        layerId: layer,
        dateRange: props.dateRange
      });
    });
  });
  var framePublicAPI = {
    datasourceLayers: datasourceLayers,
    dateRange: props.dateRange,
    query: props.query,
    filters: props.filters,
    addNewLayer: function addNewLayer() {
      var newLayerId = (0, _id_generator.generateId)();
      dispatch({
        type: 'UPDATE_LAYER',
        datasourceId: state.activeDatasourceId,
        layerId: newLayerId,
        updater: props.datasourceMap[state.activeDatasourceId].insertLayer
      });
      return newLayerId;
    },
    removeLayers: function removeLayers(layerIds) {
      if (activeVisualization && activeVisualization.removeLayer && state.visualization.state) {
        dispatch({
          type: 'UPDATE_VISUALIZATION_STATE',
          visualizationId: activeVisualization.id,
          newState: layerIds.reduce(function (acc, layerId) {
            return activeVisualization.removeLayer ? activeVisualization.removeLayer(acc, layerId) : acc;
          }, state.visualization.state)
        });
      }

      layerIds.forEach(function (layerId) {
        var layerDatasourceId = Object.entries(props.datasourceMap).find(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              datasourceId = _ref5[0],
              datasource = _ref5[1];

          return state.datasourceStates[datasourceId] && datasource.getLayers(state.datasourceStates[datasourceId].state).includes(layerId);
        })[0];
        dispatch({
          type: 'UPDATE_LAYER',
          layerId: layerId,
          datasourceId: layerDatasourceId,
          updater: props.datasourceMap[layerDatasourceId].removeLayer
        });
      });
    }
  };
  (0, _react.useEffect)(function () {
    if (props.doc) {
      dispatch({
        type: 'VISUALIZATION_LOADED',
        doc: props.doc
      });
    } else {
      dispatch({
        type: 'RESET',
        state: (0, _state_management.getInitialState)(props)
      });
    }
  }, [props.doc]); // Initialize visualization as soon as all datasources are ready

  (0, _react.useEffect)(function () {
    if (allLoaded && state.visualization.state === null && activeVisualization) {
      var initialVisualizationState = activeVisualization.initialize(framePublicAPI);
      dispatch({
        type: 'UPDATE_VISUALIZATION_STATE',
        visualizationId: activeVisualization.id,
        newState: initialVisualizationState
      });
    }
  }, [allLoaded, activeVisualization, state.visualization.state]); // The frame needs to call onChange every time its internal state changes

  (0, _react.useEffect)(function () {
    var activeDatasource = state.activeDatasourceId && !state.datasourceStates[state.activeDatasourceId].isLoading ? props.datasourceMap[state.activeDatasourceId] : undefined;

    if (!activeDatasource || !activeVisualization) {
      return;
    }

    var indexPatterns = [];
    Object.entries(props.datasourceMap).filter(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          id = _ref7[0],
          datasource = _ref7[1];

      var stateWrapper = state.datasourceStates[id];
      return stateWrapper && !stateWrapper.isLoading && datasource.getLayers(stateWrapper.state).length > 0;
    }).forEach(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          id = _ref9[0],
          datasource = _ref9[1];

      indexPatterns.push.apply(indexPatterns, _toConsumableArray(datasource.getMetaData(state.datasourceStates[id].state).filterableIndexPatterns));
    });
    var doc = (0, _save.getSavedObjectFormat)({
      activeDatasources: Object.keys(state.datasourceStates).reduce(function (datasourceMap, datasourceId) {
        return _objectSpread({}, datasourceMap, _defineProperty({}, datasourceId, props.datasourceMap[datasourceId]));
      }, {}),
      visualization: activeVisualization,
      state: state,
      framePublicAPI: framePublicAPI
    });
    props.onChange({
      filterableIndexPatterns: indexPatterns,
      doc: doc
    });
  }, [activeVisualization, state.datasourceStates, state.visualization, props.query, props.dateRange, props.filters, props.savedQuery, state.title]);
  return _react.default.createElement(_drag_drop.RootDragDropProvider, null, _react.default.createElement(_frame_layout.FrameLayout, {
    dataPanel: _react.default.createElement(_data_panel_wrapper.DataPanelWrapper, {
      datasourceMap: props.datasourceMap,
      activeDatasource: state.activeDatasourceId,
      datasourceState: state.activeDatasourceId ? state.datasourceStates[state.activeDatasourceId].state : null,
      datasourceIsLoading: state.activeDatasourceId ? state.datasourceStates[state.activeDatasourceId].isLoading : true,
      dispatch: dispatch,
      core: props.core,
      query: props.query,
      dateRange: props.dateRange,
      filters: props.filters
    }),
    configPanel: allLoaded && _react.default.createElement(_config_panel_wrapper.ConfigPanelWrapper, {
      activeDatasourceId: state.activeDatasourceId,
      datasourceMap: props.datasourceMap,
      datasourceStates: state.datasourceStates,
      visualizationMap: props.visualizationMap,
      activeVisualizationId: state.visualization.activeId,
      dispatch: dispatch,
      visualizationState: state.visualization.state,
      framePublicAPI: framePublicAPI,
      core: props.core
    }),
    workspacePanel: allLoaded && _react.default.createElement(_workspace_panel_wrapper.WorkspacePanelWrapper, {
      title: state.title
    }, _react.default.createElement(_workspace_panel.WorkspacePanel, {
      activeDatasourceId: state.activeDatasourceId,
      activeVisualizationId: state.visualization.activeId,
      datasourceMap: props.datasourceMap,
      datasourceStates: state.datasourceStates,
      framePublicAPI: framePublicAPI,
      visualizationState: state.visualization.state,
      visualizationMap: props.visualizationMap,
      dispatch: dispatch,
      ExpressionRenderer: props.ExpressionRenderer,
      core: props.core
    })),
    suggestionsPanel: allLoaded && _react.default.createElement(_suggestion_panel.SuggestionPanel, {
      frame: framePublicAPI,
      activeDatasourceId: state.activeDatasourceId,
      activeVisualizationId: state.visualization.activeId,
      datasourceMap: props.datasourceMap,
      datasourceStates: state.datasourceStates,
      visualizationState: state.visualization.state,
      visualizationMap: props.visualizationMap,
      dispatch: dispatch,
      ExpressionRenderer: props.ExpressionRenderer,
      stagedPreview: state.stagedPreview
    })
  }));
}