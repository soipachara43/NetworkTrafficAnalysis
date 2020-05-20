"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMLJobEffect = fetchMLJobEffect;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _fetch_effect = require("./fetch_effect");

var _ml_anomaly = require("../api/ml_anomaly");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchMLJobEffect);

function fetchMLJobEffect() {
  return regeneratorRuntime.wrap(function fetchMLJobEffect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)(_actions.getExistingMLJobAction.get, (0, _fetch_effect.fetchEffectFactory)(_ml_anomaly.getExistingJobs, _actions.getExistingMLJobAction.success, _actions.getExistingMLJobAction.fail));

        case 2:
          _context.next = 4;
          return (0, _effects.takeLatest)(_actions.createMLJobAction.get, (0, _fetch_effect.fetchEffectFactory)(_ml_anomaly.createMLJob, _actions.createMLJobAction.success, _actions.createMLJobAction.fail));

        case 4:
          _context.next = 6;
          return (0, _effects.takeLatest)(_actions.getAnomalyRecordsAction.get, (0, _fetch_effect.fetchEffectFactory)(_ml_anomaly.fetchAnomalyRecords, _actions.getAnomalyRecordsAction.success, _actions.getAnomalyRecordsAction.fail));

        case 6:
          _context.next = 8;
          return (0, _effects.takeLatest)(_actions.deleteMLJobAction.get, (0, _fetch_effect.fetchEffectFactory)(_ml_anomaly.deleteMLJob, _actions.deleteMLJobAction.success, _actions.deleteMLJobAction.fail));

        case 8:
          _context.next = 10;
          return (0, _effects.takeLatest)(_actions.getMLCapabilitiesAction.get, (0, _fetch_effect.fetchEffectFactory)(_ml_anomaly.getMLCapabilities, _actions.getMLCapabilitiesAction.success, _actions.getMLCapabilitiesAction.fail));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}