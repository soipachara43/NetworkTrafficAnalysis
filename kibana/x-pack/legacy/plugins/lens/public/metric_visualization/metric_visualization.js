"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metricVisualization = void 0;

var _i18n = require("@kbn/i18n");

var _metric_suggestions = require("./metric_suggestions");

var _chart_metric = _interopRequireDefault(require("../assets/chart_metric.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var toExpression = function toExpression(state, frame) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'full';

  if (!state.accessor) {
    return null;
  }

  var _Object$values = Object.values(frame.datasourceLayers),
      _Object$values2 = _slicedToArray(_Object$values, 1),
      datasource = _Object$values2[0];

  var operation = datasource && datasource.getOperationForColumnId(state.accessor);
  return {
    type: 'expression',
    chain: [{
      type: 'function',
      function: 'lens_metric_chart',
      arguments: {
        title: [operation && operation.label || ''],
        accessor: [state.accessor],
        mode: [mode]
      }
    }]
  };
};

var metricVisualization = {
  id: 'lnsMetric',
  visualizationTypes: [{
    id: 'lnsMetric',
    icon: 'visMetric',
    largeIcon: _chart_metric.default,
    label: _i18n.i18n.translate('xpack.lens.metric.label', {
      defaultMessage: 'Metric'
    })
  }],
  clearLayer: function clearLayer(state) {
    return _objectSpread({}, state, {
      accessor: undefined
    });
  },
  getLayerIds: function getLayerIds(state) {
    return [state.layerId];
  },
  getDescription: function getDescription() {
    return {
      icon: _chart_metric.default,
      label: _i18n.i18n.translate('xpack.lens.metric.label', {
        defaultMessage: 'Metric'
      })
    };
  },
  getSuggestions: _metric_suggestions.getSuggestions,
  initialize: function initialize(frame, state) {
    return state || {
      layerId: frame.addNewLayer(),
      accessor: undefined
    };
  },
  getPersistableState: function getPersistableState(state) {
    return state;
  },
  getConfiguration: function getConfiguration(props) {
    return {
      groups: [{
        groupId: 'metric',
        groupLabel: _i18n.i18n.translate('xpack.lens.metric.label', {
          defaultMessage: 'Metric'
        }),
        layerId: props.state.layerId,
        accessors: props.state.accessor ? [props.state.accessor] : [],
        supportsMoreColumns: !props.state.accessor,
        filterOperations: function filterOperations(op) {
          return !op.isBucketed && op.dataType === 'number';
        }
      }]
    };
  },
  toExpression: toExpression,
  toPreviewExpression: function toPreviewExpression(state, frame) {
    return toExpression(state, frame, 'reduced');
  },
  setDimension: function setDimension(_ref) {
    var prevState = _ref.prevState,
        columnId = _ref.columnId;
    return _objectSpread({}, prevState, {
      accessor: columnId
    });
  },
  removeDimension: function removeDimension(_ref2) {
    var prevState = _ref2.prevState;
    return _objectSpread({}, prevState, {
      accessor: undefined
    });
  }
};
exports.metricVisualization = metricVisualization;