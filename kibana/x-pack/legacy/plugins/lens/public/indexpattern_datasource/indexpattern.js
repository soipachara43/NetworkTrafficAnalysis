"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnToOperation = columnToOperation;
exports.uniqueLabels = uniqueLabels;
exports.getIndexPatternDatasource = getIndexPatternDatasource;
Object.defineProperty(exports, "OperationType", {
  enumerable: true,
  get: function get() {
    return _operations.OperationType;
  }
});
Object.defineProperty(exports, "IndexPatternColumn", {
  enumerable: true,
  get: function get() {
    return _operations.IndexPatternColumn;
  }
});

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _loader = require("./loader");

var _to_expression = require("./to_expression");

var _dimension_panel = require("./dimension_panel");

var _datapanel = require("./datapanel");

var _indexpattern_suggestions = require("./indexpattern_suggestions");

var _utils = require("./utils");

var _layerpanel = require("./layerpanel");

var _operations = require("./operations");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _state_helpers = require("./state_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function columnToOperation(column, uniqueLabel) {
  var dataType = column.dataType,
      label = column.label,
      isBucketed = column.isBucketed,
      scale = column.scale;
  return {
    dataType: (0, _utils.normalizeOperationDataType)(dataType),
    isBucketed: isBucketed,
    scale: scale,
    label: uniqueLabel || label
  };
}
/**
 * Return a map of columnId => unique column label. Exported for testing reasons.
 */


function uniqueLabels(layers) {
  var columnLabelMap = {};
  var counts = {};

  var makeUnique = function makeUnique(label) {
    var uniqueLabel = label;

    while (counts[uniqueLabel] >= 0) {
      var num = ++counts[uniqueLabel];
      uniqueLabel = _i18n.i18n.translate('xpack.lens.indexPattern.uniqueLabel', {
        defaultMessage: '{label} [{num}]',
        values: {
          label: label,
          num: num
        }
      });
    }

    counts[uniqueLabel] = 0;
    return uniqueLabel;
  };

  Object.values(layers).forEach(function (layer) {
    if (!layer.columns) {
      return;
    }

    Object.entries(layer.columns).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          columnId = _ref2[0],
          column = _ref2[1];

      columnLabelMap[columnId] = makeUnique(column.label);
    });
  });
  return columnLabelMap;
}

function getIndexPatternDatasource(_ref3) {
  var core = _ref3.core,
      storage = _ref3.storage,
      data = _ref3.data;
  var savedObjectsClient = core.savedObjects.client;
  var uiSettings = core.uiSettings;

  var onIndexPatternLoadError = function onIndexPatternLoadError(err) {
    return core.notifications.toasts.addError(err, {
      title: _i18n.i18n.translate('xpack.lens.indexPattern.indexPatternLoadError', {
        defaultMessage: 'Error loading index pattern'
      })
    });
  }; // Not stateful. State is persisted to the frame


  var indexPatternDatasource = {
    id: 'indexpattern',
    initialize: function initialize(state) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = _loader.loadInitialState;
                _context.t1 = state;
                _context.next = 4;
                return savedObjectsClient;

              case 4:
                _context.t2 = _context.sent;
                _context.t3 = core.uiSettings.get('defaultIndex');
                _context.t4 = {
                  state: _context.t1,
                  savedObjectsClient: _context.t2,
                  defaultIndexPatternId: _context.t3
                };
                return _context.abrupt("return", (0, _context.t0)(_context.t4));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getPersistableState: function getPersistableState(_ref4) {
      var currentIndexPatternId = _ref4.currentIndexPatternId,
          layers = _ref4.layers;
      return {
        currentIndexPatternId: currentIndexPatternId,
        layers: layers
      };
    },
    insertLayer: function insertLayer(state, newLayerId) {
      return _objectSpread({}, state, {
        layers: _objectSpread({}, state.layers, _defineProperty({}, newLayerId, blankLayer(state.currentIndexPatternId)))
      });
    },
    removeLayer: function removeLayer(state, layerId) {
      var newLayers = _objectSpread({}, state.layers);

      delete newLayers[layerId];
      return _objectSpread({}, state, {
        layers: newLayers
      });
    },
    clearLayer: function clearLayer(state, layerId) {
      return _objectSpread({}, state, {
        layers: _objectSpread({}, state.layers, _defineProperty({}, layerId, blankLayer(state.currentIndexPatternId)))
      });
    },
    getLayers: function getLayers(state) {
      return Object.keys(state.layers);
    },
    removeColumn: function removeColumn(_ref5) {
      var prevState = _ref5.prevState,
          layerId = _ref5.layerId,
          columnId = _ref5.columnId;
      return (0, _state_helpers.deleteColumn)({
        state: prevState,
        layerId: layerId,
        columnId: columnId
      });
    },
    toExpression: _to_expression.toExpression,
    getMetaData: function getMetaData(state) {
      return {
        filterableIndexPatterns: _lodash.default.uniq(Object.values(state.layers).map(function (layer) {
          return layer.indexPatternId;
        }).map(function (indexPatternId) {
          return {
            id: indexPatternId,
            title: state.indexPatterns[indexPatternId].title
          };
        }))
      };
    },
    renderDataPanel: function renderDataPanel(domElement, props) {
      (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_datapanel.IndexPatternDataPanel, _extends({
        changeIndexPattern: function changeIndexPattern(id, state, setState) {
          (0, _loader.changeIndexPattern)({
            id: id,
            state: state,
            setState: setState,
            savedObjectsClient: savedObjectsClient,
            onError: onIndexPatternLoadError
          });
        }
      }, props))), domElement);
    },
    renderDimensionTrigger: function renderDimensionTrigger(domElement, props) {
      var columnLabelMap = uniqueLabels(props.state.layers);
      (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_public.KibanaContextProvider, {
        services: {
          appName: 'lens',
          storage: storage,
          uiSettings: uiSettings,
          data: data,
          savedObjects: core.savedObjects,
          docLinks: core.docLinks
        }
      }, _react.default.createElement(_dimension_panel.IndexPatternDimensionTrigger, _extends({
        uniqueLabel: columnLabelMap[props.columnId]
      }, props)))), domElement);
    },
    renderDimensionEditor: function renderDimensionEditor(domElement, props) {
      var columnLabelMap = uniqueLabels(props.state.layers);
      (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_public.KibanaContextProvider, {
        services: {
          appName: 'lens',
          storage: storage,
          uiSettings: uiSettings,
          data: data,
          savedObjects: core.savedObjects,
          docLinks: core.docLinks
        }
      }, _react.default.createElement(_dimension_panel.IndexPatternDimensionEditor, _extends({
        uiSettings: uiSettings,
        storage: storage,
        savedObjectsClient: core.savedObjects.client,
        http: core.http,
        data: data,
        uniqueLabel: columnLabelMap[props.columnId]
      }, props)))), domElement);
    },
    renderLayerPanel: function renderLayerPanel(domElement, props) {
      (0, _reactDom.render)(_react.default.createElement(_layerpanel.LayerPanel, _extends({
        state: props.state,
        onChangeIndexPattern: function onChangeIndexPattern(indexPatternId) {
          (0, _loader.changeLayerIndexPattern)({
            savedObjectsClient: savedObjectsClient,
            indexPatternId: indexPatternId,
            setState: props.setState,
            state: props.state,
            layerId: props.layerId,
            onError: onIndexPatternLoadError,
            replaceIfPossible: true
          });
        }
      }, props)), domElement);
    },
    canHandleDrop: _dimension_panel.canHandleDrop,
    onDrop: _dimension_panel.onDrop,
    getPublicAPI: function getPublicAPI(_ref6) {
      var state = _ref6.state,
          layerId = _ref6.layerId;
      var columnLabelMap = uniqueLabels(state.layers);
      return {
        datasourceId: 'indexpattern',
        getTableSpec: function getTableSpec() {
          return state.layers[layerId].columnOrder.map(function (colId) {
            return {
              columnId: colId
            };
          });
        },
        getOperationForColumnId: function getOperationForColumnId(columnId) {
          var layer = state.layers[layerId];

          if (layer && layer.columns[columnId]) {
            return columnToOperation(layer.columns[columnId], columnLabelMap[columnId]);
          }

          return null;
        }
      };
    },
    getDatasourceSuggestionsForField: function getDatasourceSuggestionsForField(state, draggedField) {
      return (0, _utils.isDraggedField)(draggedField) ? (0, _indexpattern_suggestions.getDatasourceSuggestionsForField)(state, draggedField.indexPatternId, draggedField.field) : [];
    },
    getDatasourceSuggestionsFromCurrentState: _indexpattern_suggestions.getDatasourceSuggestionsFromCurrentState
  };
  return indexPatternDatasource;
}

function blankLayer(indexPatternId) {
  return {
    indexPatternId: indexPatternId,
    columns: {},
    columnOrder: []
  };
}