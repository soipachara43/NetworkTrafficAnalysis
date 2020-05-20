"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntries = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getEntries = function getEntries(entityOrInfluencer) {
  var entries = Object.entries(entityOrInfluencer);

  if (Array.isArray(entries[0])) {
    var _entries = _slicedToArray(entries, 1),
        _entries$ = _slicedToArray(_entries[0], 2),
        key = _entries$[0],
        value = _entries$[1];

    return [key, value];
  } else {
    return [null, null];
  }
};

exports.getEntries = getEntries;