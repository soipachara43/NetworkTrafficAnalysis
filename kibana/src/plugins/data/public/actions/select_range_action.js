"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRangeAction = selectRangeAction;
exports.ACTION_SELECT_RANGE = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../plugins/ui_actions/public");

var _brush_event = require("./filters/brush_event");

var _ = require("..");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ACTION_SELECT_RANGE = 'ACTION_SELECT_RANGE';
exports.ACTION_SELECT_RANGE = ACTION_SELECT_RANGE;

function isCompatible(_x) {
  return _isCompatible.apply(this, arguments);
}

function _isCompatible() {
  _isCompatible = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(context) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.t0 = Boolean;
            _context2.next = 4;
            return (0, _brush_event.onBrushEvent)(context.data);

          case 4:
            _context2.t1 = _context2.sent;
            return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

          case 8:
            _context2.prev = 8;
            _context2.t2 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _isCompatible.apply(this, arguments);
}

function selectRangeAction(filterManager, timeFilter) {
  return (0, _public.createAction)({
    type: ACTION_SELECT_RANGE,
    id: ACTION_SELECT_RANGE,
    getDisplayName: function getDisplayName() {
      return _i18n.i18n.translate('data.filter.applyFilterActionTitle', {
        defaultMessage: 'Apply filter to current view'
      });
    },
    isCompatible: isCompatible,
    execute: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var timeFieldName, data, filter, selectedFilters, _esFilters$extractTim, timeRangeFilter, restOfFilters;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                timeFieldName = _ref.timeFieldName, data = _ref.data;
                _context.next = 3;
                return isCompatible({
                  timeFieldName: timeFieldName,
                  data: data
                });

              case 3:
                if (_context.sent) {
                  _context.next = 5;
                  break;
                }

                throw new _public.IncompatibleActionError();

              case 5:
                _context.next = 7;
                return (0, _brush_event.onBrushEvent)(data);

              case 7:
                filter = _context.sent;

                if (filter) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return");

              case 10:
                selectedFilters = _.esFilters.mapAndFlattenFilters([filter]);

                if (timeFieldName) {
                  _esFilters$extractTim = _.esFilters.extractTimeFilter(timeFieldName, selectedFilters), timeRangeFilter = _esFilters$extractTim.timeRangeFilter, restOfFilters = _esFilters$extractTim.restOfFilters;
                  filterManager.addFilters(restOfFilters);

                  if (timeRangeFilter) {
                    _.esFilters.changeTimeFilter(timeFilter, timeRangeFilter);
                  }
                } else {
                  filterManager.addFilters(selectedFilters);
                }

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function execute(_x2) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  });
}