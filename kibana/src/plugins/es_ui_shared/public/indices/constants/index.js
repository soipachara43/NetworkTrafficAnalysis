"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INDEX_ILLEGAL_CHARACTERS_VISIBLE = void 0;

var _public = require("../../../../data/public");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var INDEX_ILLEGAL_CHARACTERS_VISIBLE = [].concat(_toConsumableArray(_public.indexPatterns.ILLEGAL_CHARACTERS_VISIBLE), ['*']); // Insert the comma into the middle, so it doesn't look as if it has grammatical meaning when
// these characters are rendered in the UI.

exports.INDEX_ILLEGAL_CHARACTERS_VISIBLE = INDEX_ILLEGAL_CHARACTERS_VISIBLE;
var insertionIndex = Math.floor(_public.indexPatterns.ILLEGAL_CHARACTERS_VISIBLE.length / 2);
INDEX_ILLEGAL_CHARACTERS_VISIBLE.splice(insertionIndex, 0, ',');