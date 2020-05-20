"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMonitorLocations = exports.fetchMonitorDetails = void 0;

var _runtime_types = require("../../../common/runtime_types");

var _utils = require("./utils");

var _rest_api = require("../../../common/constants/rest_api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchMonitorDetails =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var monitorId, dateStart, dateEnd, params;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            monitorId = _ref2.monitorId, dateStart = _ref2.dateStart, dateEnd = _ref2.dateEnd;
            params = {
              monitorId: monitorId,
              dateStart: dateStart,
              dateEnd: dateEnd
            };
            _context.next = 4;
            return _utils.apiService.get(_rest_api.API_URLS.MONITOR_DETAILS, params, _runtime_types.MonitorDetailsType);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchMonitorDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchMonitorDetails = fetchMonitorDetails;

var fetchMonitorLocations =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref4) {
    var monitorId, dateStart, dateEnd, params;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            monitorId = _ref4.monitorId, dateStart = _ref4.dateStart, dateEnd = _ref4.dateEnd;
            params = {
              dateStart: dateStart,
              dateEnd: dateEnd,
              monitorId: monitorId
            };
            _context2.next = 4;
            return _utils.apiService.get(_rest_api.API_URLS.MONITOR_LOCATIONS, params, _runtime_types.MonitorLocationsType);

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchMonitorLocations(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchMonitorLocations = fetchMonitorLocations;