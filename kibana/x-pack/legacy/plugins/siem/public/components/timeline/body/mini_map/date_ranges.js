"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateRange = getDateRange;
exports.getDates = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var unitsToIncrements = {
  day: 'hours',
  month: 'weeks',
  week: 'days',
  year: 'quarters'
};

/**
 * A pure function that given a unit (e.g. `'year' | 'month' | 'week'...`) and
 * a date range, returns a range of `Date`s with a granularity appropriate
 * to the unit.
 *
 * @example
 * test('given a unit of "year", it returns the four quarters of the year', () => {
 *   const unit: MomentUnit = 'year';
 *   const end = moment.utc('Mon, 31 Dec 2018 23:59:59 -0700');
 *   const current = moment.utc('Mon, 01 Jan 2018 00:00:00 -0700');
 *
 *   expect(getDates({ unit, end, current })).toEqual(
 *     [
 *       '2018-01-01T07:00:00.000Z',
 *       '2018-04-01T06:00:00.000Z',
 *       '2018-07-01T06:00:00.000Z',
 *       '2018-10-01T06:00:00.000Z'
 *     ].map(d => new Date(d))
 *   );
 * });
 */
var getDates = function getDates(_ref) {
  var unit = _ref.unit,
      end = _ref.end,
      current = _ref.current;
  return current <= end ? [current.toDate()].concat(_toConsumableArray(getDates({
    current: current.clone().add(1, unitsToIncrements[unit]),
    end: end,
    unit: unit
  }))) : [];
};
/**
 * An impure function (it performs IO to get the current `Date`) that,
 * given a unit (e.g. `'year' | 'month' | 'week'...`), it
 * returns range of `Date`s with a granularity appropriate to the unit.
 */


exports.getDates = getDates;

function getDateRange(unit) {
  var current = (0, _moment.default)().utc().startOf(unit);
  var end = (0, _moment.default)().utc().endOf(unit);
  return getDates({
    current: current,
    end: end,
    // TODO: this should be relative to `unit`
    unit: unit
  });
}