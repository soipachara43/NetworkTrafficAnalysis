"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onBrushEvent = onBrushEvent;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _public = require("../../../public");

var _services = require("../../../public/services");

var _utils = require("../../search/expressions/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function onBrushEvent(_x) {
  return _onBrushEvent.apply(this, arguments);
}

function _onBrushEvent() {
  _onBrushEvent = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(event) {
    var isDate, xRaw, column, indexPattern, aggConfig, field, min, max, range;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isDate = (0, _lodash.get)(event.data, 'ordered.date');
            xRaw = (0, _lodash.get)(event.data, 'series[0].values[0].xRaw');

            if (xRaw) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            column = xRaw.table.columns[xRaw.column];

            if (!(!column || !column.meta)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            _context.next = 9;
            return (0, _services.getIndexPatterns)().get(column.meta.indexPatternId);

          case 9:
            indexPattern = _context.sent;
            aggConfig = (0, _utils.deserializeAggConfig)(_objectSpread({}, column.meta, {
              indexPattern: indexPattern
            }));
            field = aggConfig.params.field;

            if (!(!field || event.range.length <= 1)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            min = event.range[0];
            max = (0, _lodash.last)(event.range);

            if (!(min === max)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return");

          case 18:
            range = {
              gte: isDate ? (0, _moment.default)(min).toISOString() : min,
              lt: isDate ? (0, _moment.default)(max).toISOString() : max
            };

            if (isDate) {
              range.format = 'strict_date_optional_time';
            }

            return _context.abrupt("return", _public.esFilters.buildRangeFilter(field, range, indexPattern));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _onBrushEvent.apply(this, arguments);
}