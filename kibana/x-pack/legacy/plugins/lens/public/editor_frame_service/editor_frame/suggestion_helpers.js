"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestions = getSuggestions;
exports.switchToSuggestion = switchToSuggestion;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * This function takes a list of available data tables and a list of visualization
 * extensions and creates a ranked list of suggestions which contain a pair of a data table
 * and a visualization.
 *
 * Each suggestion represents a valid state of the editor and can be applied by creating an
 * action with `toSwitchAction` and dispatching it
 */
function getSuggestions(_ref) {
  var datasourceMap = _ref.datasourceMap,
      datasourceStates = _ref.datasourceStates,
      visualizationMap = _ref.visualizationMap,
      activeVisualizationId = _ref.activeVisualizationId,
      visualizationState = _ref.visualizationState,
      field = _ref.field;
  var datasources = Object.entries(datasourceMap).filter(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        datasourceId = _ref3[0];

    return datasourceStates[datasourceId] && !datasourceStates[datasourceId].isLoading;
  }); // Collect all table suggestions from available datasources

  var datasourceTableSuggestions = _lodash.default.flatten(datasources.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        datasourceId = _ref5[0],
        datasource = _ref5[1];

    var datasourceState = datasourceStates[datasourceId].state;
    return (field ? datasource.getDatasourceSuggestionsForField(datasourceState, field) : datasource.getDatasourceSuggestionsFromCurrentState(datasourceState)).map(function (suggestion) {
      return _objectSpread({}, suggestion, {
        datasourceId: datasourceId
      });
    });
  })); // Pass all table suggestions to all visualization extensions to get visualization suggestions
  // and rank them by score


  return _lodash.default.flatten(Object.entries(visualizationMap).map(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        visualizationId = _ref7[0],
        visualization = _ref7[1];

    return _lodash.default.flatten(datasourceTableSuggestions.map(function (datasourceSuggestion) {
      var table = datasourceSuggestion.table;
      var currentVisualizationState = visualizationId === activeVisualizationId ? visualizationState : undefined;
      return getVisualizationSuggestions(visualization, table, visualizationId, datasourceSuggestion, currentVisualizationState);
    }));
  })).sort(function (a, b) {
    return b.score - a.score;
  });
}
/**
 * Queries a single visualization extensions for a single datasource suggestion and
 * creates an array of complete suggestions containing both the target datasource
 * state and target visualization state along with suggestion meta data like score,
 * title and preview expression.
 */


function getVisualizationSuggestions(visualization, table, visualizationId, datasourceSuggestion, currentVisualizationState) {
  return visualization.getSuggestions({
    table: table,
    state: currentVisualizationState,
    keptLayerIds: datasourceSuggestion.keptLayerIds
  }).map(function (_ref8) {
    var state = _ref8.state,
        visualizationSuggestion = _objectWithoutProperties(_ref8, ["state"]);

    return _objectSpread({}, visualizationSuggestion, {
      visualizationId: visualizationId,
      visualizationState: state,
      keptLayerIds: datasourceSuggestion.keptLayerIds,
      datasourceState: datasourceSuggestion.state,
      datasourceId: datasourceSuggestion.datasourceId,
      columns: table.columns.length,
      changeType: table.changeType
    });
  });
}

function switchToSuggestion(dispatch, suggestion) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'SELECT_SUGGESTION';
  var action = {
    type: type,
    newVisualizationId: suggestion.visualizationId,
    initialState: suggestion.visualizationState,
    datasourceState: suggestion.datasourceState,
    datasourceId: suggestion.datasourceId
  };
  dispatch(action);
}