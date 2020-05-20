"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPingHistogramEffect = fetchPingHistogramEffect;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _api = require("../api");

var _fetch_effect = require("./fetch_effect");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchPingHistogramEffect);

function fetchPingHistogramEffect() {
  return regeneratorRuntime.wrap(function fetchPingHistogramEffect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(String(_actions.getPingHistogram), (0, _fetch_effect.fetchEffectFactory)(_api.fetchPingHistogram, _actions.getPingHistogramSuccess, _actions.getPingHistogramFail));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}