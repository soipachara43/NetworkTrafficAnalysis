"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSignalIndex = exports.getUserPrivilege = exports.getSignalIndex = exports.updateSignalStatus = exports.fetchQuerySignals = void 0;

var _kibana = require("../../../lib/kibana");

var _constants = require("../../../../common/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Fetch Signals by providing a query
 *
 * @param query String to match a dsl
 * @param signal to cancel request
 *
 * @throws An error if response is not OK
 */
var fetchQuerySignals =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var query, signal;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = _ref2.query, signal = _ref2.signal;
            return _context.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_QUERY_SIGNALS_URL, {
              method: 'POST',
              body: JSON.stringify(query),
              signal: signal
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchQuerySignals(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Update signal status by query
 *
 * @param query of signals to update
 * @param status to update to('open' / 'closed')
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.fetchQuerySignals = fetchQuerySignals;

var updateSignalStatus =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref4) {
    var query, status, signal;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = _ref4.query, status = _ref4.status, signal = _ref4.signal;
            return _context2.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_SIGNALS_STATUS_URL, {
              method: 'POST',
              body: JSON.stringify(_objectSpread({
                status: status
              }, query)),
              signal: signal
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateSignalStatus(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Fetch Signal Index
 *
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.updateSignalStatus = updateSignalStatus;

var getSignalIndex =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref6) {
    var signal;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            signal = _ref6.signal;
            return _context3.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_INDEX_URL, {
              method: 'GET',
              signal: signal
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getSignalIndex(_x3) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Get User Privileges
 *
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.getSignalIndex = getSignalIndex;

var getUserPrivilege =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref8) {
    var signal;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            signal = _ref8.signal;
            return _context4.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_PRIVILEGES_URL, {
              method: 'GET',
              signal: signal
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getUserPrivilege(_x4) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Create Signal Index if needed it
 *
 * @param signal AbortSignal for cancelling request
 *
 * @throws An error if response is not OK
 */


exports.getUserPrivilege = getUserPrivilege;

var createSignalIndex =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref10) {
    var signal;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            signal = _ref10.signal;
            return _context5.abrupt("return", _kibana.KibanaServices.get().http.fetch(_constants.DETECTION_ENGINE_INDEX_URL, {
              method: 'POST',
              signal: signal
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createSignalIndex(_x5) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createSignalIndex = createSignalIndex;