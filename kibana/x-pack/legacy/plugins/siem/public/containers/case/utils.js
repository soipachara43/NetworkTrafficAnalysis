"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeServiceConnectorCaseResponse = exports.decodeCaseUserActionsResponse = exports.decodeCaseConfigureResponse = exports.decodeCasesFindResponse = exports.decodeCasesResponse = exports.decodeCaseResponse = exports.createToasterPlainError = exports.decodeCasesStatusResponse = exports.convertAllCasesToCamel = exports.convertToCamelCase = exports.convertArrayToCamelCase = exports.getTypedPayload = void 0;

var _lodash = require("lodash");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _api = require("../../../../../../plugins/case/common/api");

var _toasters = require("../../components/toasters");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getTypedPayload = function getTypedPayload(a) {
  return a;
};

exports.getTypedPayload = getTypedPayload;

var convertArrayToCamelCase = function convertArrayToCamelCase(arrayOfSnakes) {
  return arrayOfSnakes.reduce(function (acc, value) {
    if ((0, _lodash.isArray)(value)) {
      return [].concat(_toConsumableArray(acc), [convertArrayToCamelCase(value)]);
    } else if ((0, _lodash.isObject)(value)) {
      return [].concat(_toConsumableArray(acc), [convertToCamelCase(value)]);
    } else {
      return [].concat(_toConsumableArray(acc), [value]);
    }
  }, []);
};

exports.convertArrayToCamelCase = convertArrayToCamelCase;

var convertToCamelCase = function convertToCamelCase(snakeCase) {
  return Object.entries(snakeCase).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if ((0, _lodash.isArray)(value)) {
      (0, _lodash.set)(acc, (0, _lodash.camelCase)(key), convertArrayToCamelCase(value));
    } else if ((0, _lodash.isObject)(value)) {
      (0, _lodash.set)(acc, (0, _lodash.camelCase)(key), convertToCamelCase(value));
    } else {
      (0, _lodash.set)(acc, (0, _lodash.camelCase)(key), value);
    }

    return acc;
  }, {});
};

exports.convertToCamelCase = convertToCamelCase;

var convertAllCasesToCamel = function convertAllCasesToCamel(snakeCases) {
  return {
    cases: snakeCases.cases.map(function (snakeCase) {
      return convertToCamelCase(snakeCase);
    }),
    countClosedCases: snakeCases.count_closed_cases,
    countOpenCases: snakeCases.count_open_cases,
    page: snakeCases.page,
    perPage: snakeCases.per_page,
    total: snakeCases.total
  };
};

exports.convertAllCasesToCamel = convertAllCasesToCamel;

var decodeCasesStatusResponse = function decodeCasesStatusResponse(respCase) {
  return (0, _pipeable.pipe)(_api.CasesStatusResponseRt.decode(respCase), (0, _Either.fold)((0, _api.throwErrors)(createToasterPlainError), _function.identity));
};

exports.decodeCasesStatusResponse = decodeCasesStatusResponse;

var createToasterPlainError = function createToasterPlainError(message) {
  return new _toasters.ToasterError([message]);
};

exports.createToasterPlainError = createToasterPlainError;

var decodeCaseResponse = function decodeCaseResponse(respCase) {
  return (0, _pipeable.pipe)(_api.CaseResponseRt.decode(respCase), (0, _Either.fold)((0, _api.throwErrors)(createToasterPlainError), _function.identity));
};

exports.decodeCaseResponse = decodeCaseResponse;

var decodeCasesResponse = function decodeCasesResponse(respCase) {
  return (0, _pipeable.pipe)(_api.CasesResponseRt.decode(respCase), (0, _Either.fold)((0, _api.throwErrors)(createToasterPlainError), _function.identity));
};

exports.decodeCasesResponse = decodeCasesResponse;

var decodeCasesFindResponse = function decodeCasesFindResponse(respCases) {
  return (0, _pipeable.pipe)(_api.CasesFindResponseRt.decode(respCases), (0, _Either.fold)((0, _api.throwErrors)(createToasterPlainError), _function.identity));
};

exports.decodeCasesFindResponse = decodeCasesFindResponse;

var decodeCaseConfigureResponse = function decodeCaseConfigureResponse(respCase) {
  return (0, _pipeable.pipe)(_api.CaseConfigureResponseRt.decode(respCase), (0, _Either.fold)((0, _api.throwErrors)(createToasterPlainError), _function.identity));
};

exports.decodeCaseConfigureResponse = decodeCaseConfigureResponse;

var decodeCaseUserActionsResponse = function decodeCaseUserActionsResponse(respUserActions) {
  return (0, _pipeable.pipe)(_api.CaseUserActionsResponseRt.decode(respUserActions), (0, _Either.fold)((0, _api.throwErrors)(createToasterPlainError), _function.identity));
};

exports.decodeCaseUserActionsResponse = decodeCaseUserActionsResponse;

var decodeServiceConnectorCaseResponse = function decodeServiceConnectorCaseResponse(respPushCase) {
  return (0, _pipeable.pipe)(_api.ServiceConnectorCaseResponseRt.decode(respPushCase), (0, _Either.fold)((0, _api.throwErrors)(createToasterPlainError), _function.identity));
};

exports.decodeServiceConnectorCaseResponse = decodeServiceConnectorCaseResponse;