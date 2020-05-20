"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchOverviewFilters = void 0;

var _runtime_types = require("../../../common/runtime_types");

var _utils = require("./utils");

var _rest_api = require("../../../common/constants/rest_api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchOverviewFilters =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var dateRangeStart, dateRangeEnd, search, schemes, locations, ports, tags, queryParams;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dateRangeStart = _ref2.dateRangeStart, dateRangeEnd = _ref2.dateRangeEnd, search = _ref2.search, schemes = _ref2.schemes, locations = _ref2.locations, ports = _ref2.ports, tags = _ref2.tags;
            queryParams = {
              dateRangeStart: dateRangeStart,
              dateRangeEnd: dateRangeEnd,
              schemes: schemes,
              locations: locations,
              ports: ports,
              tags: tags,
              search: search
            };
            _context.next = 4;
            return _utils.apiService.get(_rest_api.API_URLS.FILTERS, queryParams, _runtime_types.OverviewFiltersType);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchOverviewFilters(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchOverviewFilters = fetchOverviewFilters;