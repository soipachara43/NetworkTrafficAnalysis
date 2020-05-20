"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSnapshotCount = void 0;

var _runtime_types = require("../../../common/runtime_types");

var _utils = require("./utils");

var _rest_api = require("../../../common/constants/rest_api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchSnapshotCount =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var dateRangeStart, dateRangeEnd, filters, statusFilter, queryParams;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dateRangeStart = _ref2.dateRangeStart, dateRangeEnd = _ref2.dateRangeEnd, filters = _ref2.filters, statusFilter = _ref2.statusFilter;
            queryParams = _objectSpread({
              dateRangeStart: dateRangeStart,
              dateRangeEnd: dateRangeEnd
            }, filters && {
              filters: filters
            }, {}, statusFilter && {
              statusFilter: statusFilter
            });
            _context.next = 4;
            return _utils.apiService.get(_rest_api.API_URLS.SNAPSHOT_COUNT, queryParams, _runtime_types.SnapshotType);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchSnapshotCount(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchSnapshotCount = fetchSnapshotCount;