"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBeginningTokens = exports.getLinksFromSignature = void 0;

var _fp = require("lodash/fp");

var _suricataSidDb = require("suricata-sid-db");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getLinksFromSignature = function getLinksFromSignature(id) {
  var refs = _suricataSidDb.db[id];

  if (refs != null) {
    return (0, _fp.uniq)(refs);
  } else {
    return [];
  }
};

exports.getLinksFromSignature = getLinksFromSignature;
var specialTokenRules = ['IPv4', 'IPv6'];

var getBeginningTokens = function getBeginningTokens(signature) {
  var signatureSplit = signature.trim().split(' ');
  return signatureSplit.reduce(function (accum, curr, index) {
    if (accum.length === index && curr === curr.toUpperCase() && curr !== '' || specialTokenRules.includes(curr)) {
      return [].concat(_toConsumableArray(accum), [curr]);
    }

    return accum;
  }, []);
};

exports.getBeginningTokens = getBeginningTokens;