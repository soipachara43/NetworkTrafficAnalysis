"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEditorState = initEditorState;
exports.createEditorStateReducer = void 0;

var _lodash = require("lodash");

var _public = require("../../../../../../../plugins/data/public");

var _constants = require("./constants");

var _agg_group_helper = require("../../agg_group_helper");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function initEditorState(vis) {
  return _objectSpread({}, vis.clone());
}

var createEditorStateReducer = function createEditorStateReducer(_ref) {
  var createAggConfigs = _ref.aggs.createAggConfigs;
  return function (state, action) {
    switch (action.type) {
      case _constants.EditorStateActionTypes.ADD_NEW_AGG:
        {
          var schema = action.payload.schema;
          var defaultConfig = !state.data.aggs.aggs.find(function (agg) {
            return agg.schema === schema.name;
          }) && schema.defaults ? schema.defaults.slice(0, schema.max) : {
            schema: schema.name
          };
          var aggConfig = state.data.aggs.createAggConfig(defaultConfig, {
            addToAggConfigs: false
          });
          aggConfig.brandNew = true;
          var newAggs = [].concat(_toConsumableArray(state.data.aggs.aggs), [aggConfig]);
          return _objectSpread({}, state, {
            data: _objectSpread({}, state.data, {
              aggs: createAggConfigs(state.data.indexPattern, newAggs)
            })
          });
        }

      case _constants.EditorStateActionTypes.DISCARD_CHANGES:
        {
          return initEditorState(action.payload);
        }

      case _constants.EditorStateActionTypes.CHANGE_AGG_TYPE:
        {
          var _action$payload = action.payload,
              aggId = _action$payload.aggId,
              value = _action$payload.value;

          var _newAggs = state.data.aggs.aggs.map(function (agg) {
            if (agg.id === aggId) {
              agg.type = value;
              return agg.toJSON();
            }

            return agg;
          });

          return _objectSpread({}, state, {
            data: _objectSpread({}, state.data, {
              aggs: createAggConfigs(state.data.indexPattern, _newAggs)
            })
          });
        }

      case _constants.EditorStateActionTypes.SET_AGG_PARAM_VALUE:
        {
          var _action$payload2 = action.payload,
              _aggId = _action$payload2.aggId,
              paramName = _action$payload2.paramName,
              _value = _action$payload2.value;

          var _newAggs2 = state.data.aggs.aggs.map(function (agg) {
            if (agg.id === _aggId) {
              var parsedAgg = agg.toJSON();
              return _objectSpread({}, parsedAgg, {
                params: _objectSpread({}, parsedAgg.params, _defineProperty({}, paramName, _value))
              });
            }

            return agg;
          });

          return _objectSpread({}, state, {
            data: _objectSpread({}, state.data, {
              aggs: createAggConfigs(state.data.indexPattern, _newAggs2)
            })
          });
        }

      case _constants.EditorStateActionTypes.SET_STATE_PARAM_VALUE:
        {
          var _action$payload3 = action.payload,
              _paramName = _action$payload3.paramName,
              _value2 = _action$payload3.value;
          return _objectSpread({}, state, {
            params: _objectSpread({}, state.params, _defineProperty({}, _paramName, _value2))
          });
        }

      case _constants.EditorStateActionTypes.REMOVE_AGG:
        {
          var isMetric = false;

          var _newAggs3 = state.data.aggs.aggs.filter(function (_ref2) {
            var id = _ref2.id,
                schema = _ref2.schema;

            if (id === action.payload.aggId) {
              var schemaDef = action.payload.schemas.find(function (s) {
                return s.name === schema;
              });

              if (schemaDef && schemaDef.group === _public.AggGroupNames.Metrics) {
                isMetric = true;
              }

              return false;
            }

            return true;
          });

          if (isMetric && (0, _agg_group_helper.getEnabledMetricAggsCount)(_newAggs3) === 0) {
            var aggToEnable = _newAggs3.find(function (agg) {
              return agg.schema === 'metric';
            });

            if (aggToEnable) {
              aggToEnable.enabled = true;
            }
          }

          return _objectSpread({}, state, {
            data: _objectSpread({}, state.data, {
              aggs: createAggConfigs(state.data.indexPattern, _newAggs3)
            })
          });
        }

      case _constants.EditorStateActionTypes.REORDER_AGGS:
        {
          var _action$payload4 = action.payload,
              sourceAgg = _action$payload4.sourceAgg,
              destinationAgg = _action$payload4.destinationAgg;
          var destinationIndex = state.data.aggs.aggs.indexOf(destinationAgg);

          var _newAggs4 = _toConsumableArray(state.data.aggs.aggs);

          _newAggs4.splice(destinationIndex, 0, _newAggs4.splice(state.data.aggs.aggs.indexOf(sourceAgg), 1)[0]);

          return _objectSpread({}, state, {
            data: _objectSpread({}, state.data, {
              aggs: createAggConfigs(state.data.indexPattern, _newAggs4)
            })
          });
        }

      case _constants.EditorStateActionTypes.TOGGLE_ENABLED_AGG:
        {
          var _action$payload5 = action.payload,
              _aggId2 = _action$payload5.aggId,
              enabled = _action$payload5.enabled;

          var _newAggs5 = state.data.aggs.aggs.map(function (agg) {
            if (agg.id === _aggId2) {
              var parsedAgg = agg.toJSON();
              return _objectSpread({}, parsedAgg, {
                enabled: enabled
              });
            }

            return agg;
          });

          return _objectSpread({}, state, {
            data: _objectSpread({}, state.data, {
              aggs: createAggConfigs(state.data.indexPattern, _newAggs5)
            })
          });
        }

      case _constants.EditorStateActionTypes.UPDATE_STATE_PARAMS:
        {
          var params = action.payload.params;
          return _objectSpread({}, state, {
            params: (0, _lodash.cloneDeep)(params)
          });
        }
    }
  };
};

exports.createEditorStateReducer = createEditorStateReducer;