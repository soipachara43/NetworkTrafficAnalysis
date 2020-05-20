"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchOverviewFiltersEffect = fetchOverviewFiltersEffect;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _api = require("../api");

var _fetch_effect = require("./fetch_effect");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchOverviewFiltersEffect);

function fetchOverviewFiltersEffect() {
  return regeneratorRuntime.wrap(function fetchOverviewFiltersEffect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_actions.FETCH_OVERVIEW_FILTERS, (0, _fetch_effect.fetchEffectFactory)(_api.fetchOverviewFilters, _actions.fetchOverviewFiltersSuccess, _actions.fetchOverviewFiltersFail));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}