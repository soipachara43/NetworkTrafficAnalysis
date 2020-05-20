"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var select = function select(fun) {
  return function () {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    var prevId = NaN;
    var cache = null;

    var old = function old(object) {
      return prevId === (prevId = object.primaryUpdate.payload.uid);
    };

    return function (obj) {
      return old(obj) ? cache : cache = fun.apply(void 0, _toConsumableArray(fns.map(function (f) {
        return f(obj);
      })));
    };
  };
};

exports.select = select;