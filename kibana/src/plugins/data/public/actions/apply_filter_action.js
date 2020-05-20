"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterAction = createFilterAction;
exports.ACTION_GLOBAL_APPLY_FILTER = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../kibana_react/public");

var _public2 = require("../../../ui_actions/public");

var _services = require("../services");

var _apply_filters = require("../ui/apply_filters");

var _ = require("..");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ACTION_GLOBAL_APPLY_FILTER = 'ACTION_GLOBAL_APPLY_FILTER';
exports.ACTION_GLOBAL_APPLY_FILTER = ACTION_GLOBAL_APPLY_FILTER;

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
            return _context2.abrupt("return", context.filters !== undefined);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _isCompatible.apply(this, arguments);
}

function createFilterAction(filterManager, timeFilter) {
  return (0, _public2.createAction)({
    type: ACTION_GLOBAL_APPLY_FILTER,
    id: ACTION_GLOBAL_APPLY_FILTER,
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
        var filters, timeFieldName, selectedFilters, indexPatterns, filterSelectionPromise, _esFilters$extractTim, timeRangeFilter, restOfFilters;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filters = _ref.filters, timeFieldName = _ref.timeFieldName;

                if (filters) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Applying a filter requires a filter');

              case 3:
                _context.next = 5;
                return isCompatible({
                  filters: filters
                });

              case 5:
                if (_context.sent) {
                  _context.next = 7;
                  break;
                }

                throw new _public2.IncompatibleActionError();

              case 7:
                selectedFilters = filters;

                if (!(selectedFilters.length > 1)) {
                  _context.next = 16;
                  break;
                }

                _context.next = 11;
                return Promise.all(filters.map(function (filter) {
                  return (0, _services.getIndexPatterns)().get(filter.meta.index);
                }));

              case 11:
                indexPatterns = _context.sent;
                filterSelectionPromise = new Promise(function (resolve) {
                  var overlay = (0, _services.getOverlays)().openModal((0, _public.toMountPoint)((0, _apply_filters.applyFiltersPopover)(filters, indexPatterns, function () {
                    overlay.close();
                    resolve([]);
                  }, function (filterSelection) {
                    overlay.close();
                    resolve(filterSelection);
                  })), {
                    'data-test-subj': 'test'
                  });
                });
                _context.next = 15;
                return filterSelectionPromise;

              case 15:
                selectedFilters = _context.sent;

              case 16:
                if (timeFieldName) {
                  _esFilters$extractTim = _.esFilters.extractTimeFilter(timeFieldName, selectedFilters), timeRangeFilter = _esFilters$extractTim.timeRangeFilter, restOfFilters = _esFilters$extractTim.restOfFilters;
                  filterManager.addFilters(restOfFilters);

                  if (timeRangeFilter) {
                    _.esFilters.changeTimeFilter(timeFilter, timeRangeFilter);
                  }
                } else {
                  filterManager.addFilters(selectedFilters);
                }

              case 17:
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