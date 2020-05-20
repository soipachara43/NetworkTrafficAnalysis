"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSelectedGroup = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var toggleSelectedGroup = function toggleSelectedGroup(group, selectedGroups, setSelectedGroups) {
  var selectedGroupIndex = selectedGroups.indexOf(group);

  var updatedSelectedGroups = _toConsumableArray(selectedGroups);

  if (selectedGroupIndex >= 0) {
    updatedSelectedGroups.splice(selectedGroupIndex, 1);
  } else {
    updatedSelectedGroups.push(group);
  }

  setSelectedGroups(updatedSelectedGroups);
};

exports.toggleSelectedGroup = toggleSelectedGroup;