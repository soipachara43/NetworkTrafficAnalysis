"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFiltersFromEvent = void 0;

var _expressions = require("../../search/expressions");

var _public = require("../../../public");

var _services = require("../../../public/services");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * For terms aggregations on `__other__` buckets, this assembles a list of applicable filter
 * terms based on a specific cell in the tabified data.
 *
 * @param  {EventData['table']} table - tabified table data
 * @param  {number} columnIndex - current column index
 * @param  {number} rowIndex - current row index
 * @return {array} - array of terms to filter against
 */
var getOtherBucketFilterTerms = function getOtherBucketFilterTerms(table, columnIndex, rowIndex) {
  if (rowIndex === -1) {
    return [];
  } // get only rows where cell value matches current row for all the fields before columnIndex


  var rows = table.rows.filter(function (row) {
    return table.columns.every(function (column, i) {
      return row[column.id] === table.rows[rowIndex][column.id] || i >= columnIndex;
    });
  });
  var terms = rows.map(function (row) {
    return row[table.columns[columnIndex].id];
  });
  return _toConsumableArray(new Set(terms.filter(function (term) {
    var notOther = term !== '__other__';
    var notMissing = term !== '__missing__';
    return notOther && notMissing;
  })));
};
/**
 * Assembles the filters needed to apply filtering against a specific cell value, while accounting
 * for cases like if the value is a terms agg in an `__other__` or `__missing__` bucket.
 *
 * @param  {EventData['table']} table - tabified table data
 * @param  {number} columnIndex - current column index
 * @param  {number} rowIndex - current row index
 * @param  {string} cellValue - value of the current cell
 * @return {Filter[]|undefined} - list of filters to provide to queryFilter.addFilters()
 */


var createFilter =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(table, columnIndex, rowIndex) {
    var column, aggConfig, filter, value, terms;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!table || !table.columns || !table.columns[columnIndex])) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            column = table.columns[columnIndex];

            if (!(!column.meta || !column.meta.indexPatternId)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            _context.t0 = _expressions.deserializeAggConfig;
            _context.t1 = column.meta.type;
            _context.t2 = column.meta.aggConfigParams ? column.meta.aggConfigParams : {};
            _context.next = 10;
            return (0, _services.getIndexPatterns)().get(column.meta.indexPatternId);

          case 10:
            _context.t3 = _context.sent;
            _context.t4 = {
              type: _context.t1,
              aggConfigParams: _context.t2,
              indexPattern: _context.t3
            };
            aggConfig = (0, _context.t0)(_context.t4);
            filter = [];
            value = rowIndex > -1 ? table.rows[rowIndex][column.id] : null;

            if (!(value === null || value === undefined || !aggConfig.isFilterable())) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return");

          case 17:
            if (aggConfig.type.name === 'terms' && aggConfig.params.otherBucket) {
              terms = getOtherBucketFilterTerms(table, columnIndex, rowIndex);
              filter = aggConfig.createFilter(value, {
                terms: terms
              });
            } else {
              filter = aggConfig.createFilter(value);
            }

            if (filter) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return");

          case 20:
            if (!Array.isArray(filter)) {
              filter = [filter];
            }

            return _context.abrupt("return", filter);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createFilter(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/** @public */


var createFiltersFromEvent =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(dataPoints, negate) {
    var filters;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filters = [];
            _context3.next = 3;
            return Promise.all(dataPoints.filter(function (point) {
              return point;
            }).map(
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(val) {
                var table, column, row, filter;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        table = val.table, column = val.column, row = val.row;
                        _context2.next = 3;
                        return createFilter(table, column, row);

                      case 3:
                        _context2.t0 = _context2.sent;

                        if (_context2.t0) {
                          _context2.next = 6;
                          break;
                        }

                        _context2.t0 = [];

                      case 6:
                        filter = _context2.t0;

                        if (filter) {
                          filter.forEach(function (f) {
                            if (negate) {
                              f = _public.esFilters.toggleFilterNegated(f);
                            }

                            filters.push(f);
                          });
                        }

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 3:
            return _context3.abrupt("return", filters);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createFiltersFromEvent(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createFiltersFromEvent = createFiltersFromEvent;