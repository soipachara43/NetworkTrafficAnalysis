"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prependDatasourceExpression = prependDatasourceExpression;
exports.prependKibanaContext = prependKibanaContext;
exports.buildExpression = buildExpression;

var _common = require("@kbn/interpreter/common");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function prependDatasourceExpression(visualizationExpression, datasourceMap, datasourceStates) {
  var datasourceExpressions = [];
  Object.entries(datasourceMap).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        datasourceId = _ref2[0],
        datasource = _ref2[1];

    var state = datasourceStates[datasourceId].state;
    var layers = datasource.getLayers(datasourceStates[datasourceId].state);
    layers.forEach(function (layerId) {
      var result = datasource.toExpression(state, layerId);

      if (result) {
        datasourceExpressions.push([layerId, result]);
      }
    });
  });

  if (datasourceExpressions.length === 0 || visualizationExpression === null) {
    return null;
  }

  var parsedDatasourceExpressions = datasourceExpressions.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        layerId = _ref4[0],
        expr = _ref4[1];

    return [layerId, typeof expr === 'string' ? (0, _common.fromExpression)(expr) : expr];
  });
  var datafetchExpression = {
    type: 'function',
    function: 'lens_merge_tables',
    arguments: {
      layerIds: parsedDatasourceExpressions.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            id = _ref6[0];

        return id;
      }),
      tables: parsedDatasourceExpressions.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            id = _ref8[0],
            expr = _ref8[1];

        return expr;
      })
    }
  };
  var parsedVisualizationExpression = typeof visualizationExpression === 'string' ? (0, _common.fromExpression)(visualizationExpression) : visualizationExpression;
  return {
    type: 'expression',
    chain: [datafetchExpression].concat(_toConsumableArray(parsedVisualizationExpression.chain))
  };
}

function prependKibanaContext(expression, _ref9) {
  var timeRange = _ref9.timeRange,
      query = _ref9.query,
      filters = _ref9.filters;
  var parsedExpression = typeof expression === 'string' ? (0, _common.fromExpression)(expression) : expression;
  return {
    type: 'expression',
    chain: [{
      type: 'function',
      function: 'kibana',
      arguments: {}
    }, {
      type: 'function',
      function: 'kibana_context',
      arguments: {
        timeRange: timeRange ? [JSON.stringify(timeRange)] : [],
        query: query ? [JSON.stringify(query)] : [],
        filters: [JSON.stringify(filters || [])]
      }
    }].concat(_toConsumableArray(parsedExpression.chain))
  };
}

function buildExpression(_ref10) {
  var visualization = _ref10.visualization,
      visualizationState = _ref10.visualizationState,
      datasourceMap = _ref10.datasourceMap,
      datasourceStates = _ref10.datasourceStates,
      framePublicAPI = _ref10.framePublicAPI,
      removeDateRange = _ref10.removeDateRange;

  if (visualization === null) {
    return null;
  }

  var visualizationExpression = visualization.toExpression(visualizationState, framePublicAPI);
  var expressionContext = removeDateRange ? {
    query: framePublicAPI.query,
    filters: framePublicAPI.filters
  } : {
    query: framePublicAPI.query,
    timeRange: {
      from: framePublicAPI.dateRange.fromDate,
      to: framePublicAPI.dateRange.toDate
    },
    filters: framePublicAPI.filters
  };
  var completeExpression = prependDatasourceExpression(visualizationExpression, datasourceMap, datasourceStates);

  if (completeExpression) {
    return prependKibanaContext(completeExpression, expressionContext);
  } else {
    return null;
  }
}