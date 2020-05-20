"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedObjectFormat = getSavedObjectFormat;

var _lodash = _interopRequireDefault(require("lodash"));

var _common = require("@kbn/interpreter/target/common");

var _expression_helpers = require("./expression_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getSavedObjectFormat(_ref) {
  var activeDatasources = _ref.activeDatasources,
      state = _ref.state,
      visualization = _ref.visualization,
      framePublicAPI = _ref.framePublicAPI;
  var expression = (0, _expression_helpers.buildExpression)({
    visualization: visualization,
    visualizationState: state.visualization.state,
    datasourceMap: activeDatasources,
    datasourceStates: state.datasourceStates,
    framePublicAPI: framePublicAPI,
    removeDateRange: true
  });
  var datasourceStates = {};
  Object.entries(activeDatasources).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        datasource = _ref3[1];

    datasourceStates[id] = datasource.getPersistableState(state.datasourceStates[id].state);
  });
  var filterableIndexPatterns = [];
  Object.entries(activeDatasources).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        id = _ref5[0],
        datasource = _ref5[1];

    filterableIndexPatterns.push.apply(filterableIndexPatterns, _toConsumableArray(datasource.getMetaData(state.datasourceStates[id].state).filterableIndexPatterns));
  });
  return {
    id: state.persistedId,
    title: state.title,
    type: 'lens',
    visualizationType: state.visualization.activeId,
    expression: expression ? (0, _common.toExpression)(expression) : '',
    state: {
      datasourceStates: datasourceStates,
      datasourceMetaData: {
        filterableIndexPatterns: _lodash.default.uniq(filterableIndexPatterns, 'id')
      },
      visualization: visualization.getPersistableState(state.visualization.state),
      query: framePublicAPI.query,
      filters: framePublicAPI.filters
    }
  };
}