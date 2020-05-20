"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setThirdPartyToMapping = exports.setActionTypeToMapping = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var setActionTypeToMapping = function setActionTypeToMapping(caseField, newActionType, mapping) {
  var findItemIndex = mapping.findIndex(function (item) {
    return item.source === caseField;
  });

  if (findItemIndex >= 0) {
    return [].concat(_toConsumableArray(mapping.slice(0, findItemIndex)), [_objectSpread({}, mapping[findItemIndex], {
      actionType: newActionType
    })], _toConsumableArray(mapping.slice(findItemIndex + 1)));
  }

  return _toConsumableArray(mapping);
};

exports.setActionTypeToMapping = setActionTypeToMapping;

var setThirdPartyToMapping = function setThirdPartyToMapping(caseField, newThirdPartyField, mapping) {
  return mapping.map(function (item) {
    if (item.source !== caseField && item.target === newThirdPartyField) {
      return _objectSpread({}, item, {
        target: 'not_mapped'
      });
    } else if (item.source === caseField) {
      return _objectSpread({}, item, {
        target: newThirdPartyField
      });
    }

    return item;
  });
};

exports.setThirdPartyToMapping = setThirdPartyToMapping;