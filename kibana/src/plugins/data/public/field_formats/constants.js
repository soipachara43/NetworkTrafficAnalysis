"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseFormattersPublic = void 0;

var _common = require("../../common");

var _date = require("./converters/date");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var baseFormattersPublic = [_date.DateFormat].concat(_toConsumableArray(_common.baseFormatters));
exports.baseFormattersPublic = baseFormattersPublic;