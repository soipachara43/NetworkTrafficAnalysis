"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeKqlVariables = exports.replacer = exports.removeKqlVariablesUsingRegex = exports.operators = void 0;

var _risonNode = require("rison-node");

var _rison_helpers = require("./rison_helpers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var operators = ['and', 'or', 'not'];
exports.operators = operators;

var removeKqlVariablesUsingRegex = function removeKqlVariablesUsingRegex(expression) {
  var myRegexp = /(\s+)*(and|or|not){0,1}(\s+)*([\w\.\-\[\]]+)\s*:\s*"(\$[\w\.\-\(\)\[\]]+\$)"(\s+)*(and|or|not){0,1}(\s+)*/g;
  return expression.replace(myRegexp, replacer);
};

exports.removeKqlVariablesUsingRegex = removeKqlVariablesUsingRegex;

var replacer = function replacer(match) {
  for (var _len = arguments.length, parts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    parts[_key - 1] = arguments[_key];
  }

  // this function is only called after applying the match..
  // see here for more details -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
  if (parts == null) {
    return '';
  }

  var operatorsMatched = parts.reduce(function (accum, part) {
    return part != null && operators.includes(part) ? [].concat(_toConsumableArray(accum), [part]) : accum;
  }, []);

  if (operatorsMatched.length > 1) {
    return " ".concat(operatorsMatched[operatorsMatched.length - 1].trim(), " ");
  } else {
    return '';
  }
};

exports.replacer = replacer;

var removeKqlVariables = function removeKqlVariables(kqlQuery) {
  var value = (0, _rison_helpers.decodeRison)(kqlQuery);

  if ((0, _rison_helpers.isRisonObject)(value)) {
    var appQuery = value;

    if ((0, _rison_helpers.isRisonObject)(appQuery)) {
      if ((0, _rison_helpers.isRegularString)(appQuery.query)) {
        appQuery.query = removeKqlVariablesUsingRegex(appQuery.query);
        return (0, _risonNode.encode)(value);
      }
    }
  }

  return kqlQuery;
};

exports.removeKqlVariables = removeKqlVariables;