"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMonitorDetailsEffect = fetchMonitorDetailsEffect;

var _effects = require("redux-saga/effects");

var _monitor = require("../actions/monitor");

var _api = require("../api");

var _fetch_effect = require("./fetch_effect");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchMonitorDetailsEffect);

function fetchMonitorDetailsEffect() {
  return regeneratorRuntime.wrap(function fetchMonitorDetailsEffect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_monitor.getMonitorDetailsAction, (0, _fetch_effect.fetchEffectFactory)(_api.fetchMonitorDetails, _monitor.getMonitorDetailsActionSuccess, _monitor.getMonitorDetailsActionFail));

        case 2:
          _context.next = 4;
          return (0, _effects.takeLatest)(_monitor.getMonitorLocationsAction, (0, _fetch_effect.fetchEffectFactory)(_api.fetchMonitorLocations, _monitor.getMonitorLocationsActionSuccess, _monitor.getMonitorLocationsActionFail));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}