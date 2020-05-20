"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootEffect = rootEffect;

var _effects = require("redux-saga/effects");

var _monitor = require("./monitor");

var _overview_filters = require("./overview_filters");

var _snapshot = require("./snapshot");

var _monitor_status = require("./monitor_status");

var _dynamic_settings = require("./dynamic_settings");

var _index_pattern = require("./index_pattern");

var _ping = require("./ping");

var _monitor_duration = require("./monitor_duration");

var _ml_anomaly = require("./ml_anomaly");

var _index_status = require("./index_status");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootEffect);

function rootEffect() {
  return regeneratorRuntime.wrap(function rootEffect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.fork)(_monitor.fetchMonitorDetailsEffect);

        case 2:
          _context.next = 4;
          return (0, _effects.fork)(_snapshot.fetchSnapshotCountEffect);

        case 4:
          _context.next = 6;
          return (0, _effects.fork)(_overview_filters.fetchOverviewFiltersEffect);

        case 6:
          _context.next = 8;
          return (0, _effects.fork)(_monitor_status.fetchMonitorStatusEffect);

        case 8:
          _context.next = 10;
          return (0, _effects.fork)(_dynamic_settings.fetchDynamicSettingsEffect);

        case 10:
          _context.next = 12;
          return (0, _effects.fork)(_dynamic_settings.setDynamicSettingsEffect);

        case 12:
          _context.next = 14;
          return (0, _effects.fork)(_index_pattern.fetchIndexPatternEffect);

        case 14:
          _context.next = 16;
          return (0, _effects.fork)(_ping.fetchPingHistogramEffect);

        case 16:
          _context.next = 18;
          return (0, _effects.fork)(_ml_anomaly.fetchMLJobEffect);

        case 18:
          _context.next = 20;
          return (0, _effects.fork)(_monitor_duration.fetchMonitorDurationEffect);

        case 20:
          _context.next = 22;
          return (0, _effects.fork)(_index_status.fetchIndexStatusEffect);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}