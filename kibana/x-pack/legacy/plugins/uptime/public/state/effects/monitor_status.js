"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMonitorStatusEffect = fetchMonitorStatusEffect;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _api = require("../api");

var _fetch_effect = require("./fetch_effect");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchMonitorStatusEffect);

function fetchMonitorStatusEffect() {
  return regeneratorRuntime.wrap(function fetchMonitorStatusEffect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_actions.getMonitorStatusAction, (0, _fetch_effect.fetchEffectFactory)(_api.fetchMonitorStatus, _actions.getMonitorStatusActionSuccess, _actions.getMonitorStatusActionFail));

        case 2:
          _context.next = 4;
          return (0, _effects.takeLatest)(_actions.getSelectedMonitorAction, (0, _fetch_effect.fetchEffectFactory)(_api.fetchSelectedMonitor, _actions.getSelectedMonitorActionSuccess, _actions.getSelectedMonitorActionFail));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}