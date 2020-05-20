"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchCaseConfigure = exports.postCaseConfigure = exports.getCaseConfigure = exports.fetchConnectors = void 0;

var _fp = require("lodash/fp");

var _kibana = require("../../../lib/kibana");

var _constants = require("../constants");

var _utils = require("../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchConnectors =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var signal, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            signal = _ref2.signal;
            _context.next = 3;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_CONFIGURE_URL, "/connectors/_find"), {
              method: 'GET',
              signal: signal
            });

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchConnectors(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchConnectors = fetchConnectors;

var getCaseConfigure =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref4) {
    var signal, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            signal = _ref4.signal;
            _context2.next = 3;
            return _kibana.KibanaServices.get().http.fetch(_constants.CASES_CONFIGURE_URL, {
              method: 'GET',
              signal: signal
            });

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", !(0, _fp.isEmpty)(response) ? (0, _utils.convertToCamelCase)((0, _utils.decodeCaseConfigureResponse)(response)) : null);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCaseConfigure(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCaseConfigure = getCaseConfigure;

var postCaseConfigure =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(caseConfiguration, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _kibana.KibanaServices.get().http.fetch(_constants.CASES_CONFIGURE_URL, {
              method: 'POST',
              body: JSON.stringify(caseConfiguration),
              signal: signal
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCaseConfigureResponse)(response)));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postCaseConfigure(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postCaseConfigure = postCaseConfigure;

var patchCaseConfigure =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(caseConfiguration, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _kibana.KibanaServices.get().http.fetch(_constants.CASES_CONFIGURE_URL, {
              method: 'PATCH',
              body: JSON.stringify(caseConfiguration),
              signal: signal
            });

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCaseConfigureResponse)(response)));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function patchCaseConfigure(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.patchCaseConfigure = patchCaseConfigure;