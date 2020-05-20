"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allRulesReducer = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var allRulesReducer = function allRulesReducer(tableRef) {
  return function (state, action) {
    switch (action.type) {
      case 'exportRuleIds':
        {
          return _objectSpread({}, state, {
            loadingRuleIds: action.ids,
            loadingRulesAction: 'export',
            exportRuleIds: action.ids
          });
        }

      case 'loadingRuleIds':
        {
          return _objectSpread({}, state, {
            loadingRuleIds: action.actionType == null ? [] : [].concat(_toConsumableArray(state.loadingRuleIds), _toConsumableArray(action.ids)),
            loadingRulesAction: action.actionType
          });
        }

      case 'selectedRuleIds':
        {
          return _objectSpread({}, state, {
            selectedRuleIds: action.ids
          });
        }

      case 'setRules':
        {
          if (tableRef != null && tableRef.current != null && tableRef.current.changeSelection != null) {
            // for future devs: eui basic table is not giving us a prop to set the value, so
            // we are using the ref in setTimeout to reset on the next loop so that we
            // do not get a warning telling us we are trying to update during a render
            window.setTimeout(function () {
              var _tableRef$current;

              return tableRef === null || tableRef === void 0 ? void 0 : (_tableRef$current = tableRef.current) === null || _tableRef$current === void 0 ? void 0 : _tableRef$current.changeSelection([]);
            }, 0);
          }

          return _objectSpread({}, state, {
            rules: action.rules,
            selectedRuleIds: [],
            loadingRuleIds: [],
            loadingRulesAction: null,
            pagination: _objectSpread({}, state.pagination, {}, action.pagination)
          });
        }

      case 'updateRules':
        {
          if (state.rules != null) {
            var ruleIds = state.rules.map(function (r) {
              return r.id;
            });
            var updatedRules = action.rules.reduce(function (rules, updatedRule) {
              var newRules = rules;

              if (ruleIds.includes(updatedRule.id)) {
                newRules = newRules.map(function (r) {
                  return updatedRule.id === r.id ? updatedRule : r;
                });
              } else {
                newRules = [].concat(_toConsumableArray(newRules), [updatedRule]);
              }

              return newRules;
            }, state.rules);
            var updatedRuleIds = action.rules.map(function (r) {
              return r.id;
            });
            var newLoadingRuleIds = state.loadingRuleIds.filter(function (id) {
              return !updatedRuleIds.includes(id);
            });
            return _objectSpread({}, state, {
              rules: updatedRules,
              loadingRuleIds: newLoadingRuleIds,
              loadingRulesAction: newLoadingRuleIds.length === 0 ? null : state.loadingRulesAction
            });
          }

          return state;
        }

      case 'updateFilterOptions':
        {
          return _objectSpread({}, state, {
            filterOptions: _objectSpread({}, state.filterOptions, {}, action.filterOptions),
            pagination: _objectSpread({}, state.pagination, {}, action.pagination)
          });
        }

      case 'failure':
        {
          return _objectSpread({}, state, {
            rules: []
          });
        }

      default:
        return state;
    }
  };
};

exports.allRulesReducer = allRulesReducer;