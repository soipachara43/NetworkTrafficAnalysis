"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueClickAction = valueClickAction;
exports.ACTION_VALUE_CLICK = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../plugins/kibana_react/public");

var _public2 = require("../../../../plugins/ui_actions/public");

var _services = require("../services");

var _apply_filters = require("../ui/apply_filters");

var _create_filters_from_event = require("./filters/create_filters_from_event");

var _ = require("..");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ACTION_VALUE_CLICK = 'ACTION_VALUE_CLICK';
exports.ACTION_VALUE_CLICK = ACTION_VALUE_CLICK;

function isCompatible(_x) {
  return _isCompatible.apply(this, arguments);
}

function _isCompatible() {
  _isCompatible = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(context) {
    var filters;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _create_filters_from_event.createFiltersFromEvent)(context.data.data || [context.data], context.data.negate);

          case 3:
            _context2.t0 = _context2.sent;

            if (_context2.t0) {
              _context2.next = 6;
              break;
            }

            _context2.t0 = [];

          case 6:
            filters = _context2.t0;
            return _context2.abrupt("return", filters.length > 0);

          case 10:
            _context2.prev = 10;
            _context2.t1 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _isCompatible.apply(this, arguments);
}

function valueClickAction(filterManager, timeFilter) {
  return (0, _public2.createAction)({
    type: ACTION_VALUE_CLICK,
    id: ACTION_VALUE_CLICK,
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
        var timeFieldName, data, filters, selectedFilters, indexPatterns, filterSelectionPromise, _esFilters$extractTim, timeRangeFilter, restOfFilters;

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

                throw new _public2.IncompatibleActionError();

              case 5:
                _context.next = 7;
                return (0, _create_filters_from_event.createFiltersFromEvent)(data.data || [data], data.negate);

              case 7:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 10;
                  break;
                }

                _context.t0 = [];

              case 10:
                filters = _context.t0;
                selectedFilters = _.esFilters.mapAndFlattenFilters(filters);

                if (!(selectedFilters.length > 1)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 15;
                return Promise.all(filters.map(function (filter) {
                  return (0, _services.getIndexPatterns)().get(filter.meta.index);
                }));

              case 15:
                indexPatterns = _context.sent;
                filterSelectionPromise = new Promise(function (resolve) {
                  var overlay = (0, _services.getOverlays)().openModal((0, _public.toMountPoint)((0, _apply_filters.applyFiltersPopover)(filters, indexPatterns, function () {
                    overlay.close();
                    resolve([]);
                  }, function (filterSelection) {
                    overlay.close();
                    resolve(filterSelection);
                  })), {
                    'data-test-subj': 'selectFilterOverlay'
                  });
                });
                _context.next = 19;
                return filterSelectionPromise;

              case 19:
                selectedFilters = _context.sent;

              case 20:
                if (timeFieldName) {
                  _esFilters$extractTim = _.esFilters.extractTimeFilter(timeFieldName, selectedFilters), timeRangeFilter = _esFilters$extractTim.timeRangeFilter, restOfFilters = _esFilters$extractTim.restOfFilters;
                  filterManager.addFilters(restOfFilters);

                  if (timeRangeFilter) {
                    _.esFilters.changeTimeFilter(timeFilter, timeRangeFilter);
                  }
                } else {
                  filterManager.addFilters(selectedFilters);
                }

              case 21:
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