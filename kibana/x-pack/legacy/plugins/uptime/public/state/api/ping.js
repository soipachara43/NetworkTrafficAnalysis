"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPingHistogram = void 0;

var _utils = require("./utils");

var _rest_api = require("../../../common/constants/rest_api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchPingHistogram =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var monitorId, dateStart, dateEnd, statusFilter, filters, queryParams;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            monitorId = _ref2.monitorId, dateStart = _ref2.dateStart, dateEnd = _ref2.dateEnd, statusFilter = _ref2.statusFilter, filters = _ref2.filters;
            queryParams = _objectSpread({
              dateStart: dateStart,
              dateEnd: dateEnd
            }, monitorId && {
              monitorId: monitorId
            }, {}, statusFilter && {
              statusFilter: statusFilter
            }, {}, filters && {
              filters: filters
            });
            _context.next = 4;
            return _utils.apiService.get(_rest_api.API_URLS.PING_HISTOGRAM, queryParams);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchPingHistogram(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchPingHistogram = fetchPingHistogram;