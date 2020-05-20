"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.getUiMetricsForPhases = getUiMetricsForPhases;
exports.trackUiMetric = void 0;

var _lodash = require("lodash");

var _constants = require("../constants");

var _defaults = require("../store/defaults");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var trackUiMetric;
exports.trackUiMetric = trackUiMetric;

function init(getReporter) {
  if (getReporter) {
    exports.trackUiMetric = trackUiMetric = getReporter(_constants.UIM_APP_NAME);
  }
}

function getUiMetricsForPhases(phases) {
  var phaseUiMetrics = [{
    metric: _constants.UIM_CONFIG_COLD_PHASE,
    isTracked: function isTracked() {
      return Boolean(phases[_constants.PHASE_COLD]);
    }
  }, {
    metric: _constants.UIM_CONFIG_WARM_PHASE,
    isTracked: function isTracked() {
      return Boolean(phases[_constants.PHASE_WARM]);
    }
  }, {
    metric: _constants.UIM_CONFIG_SET_PRIORITY,
    isTracked: function isTracked() {
      var _phaseToDefaultIndexP;

      var phaseToDefaultIndexPriorityMap = (_phaseToDefaultIndexP = {}, _defineProperty(_phaseToDefaultIndexP, _constants.PHASE_HOT, _defaults.defaultHotPhase[_constants.PHASE_INDEX_PRIORITY]), _defineProperty(_phaseToDefaultIndexP, _constants.PHASE_WARM, _defaults.defaultWarmPhase[_constants.PHASE_INDEX_PRIORITY]), _defineProperty(_phaseToDefaultIndexP, _constants.PHASE_COLD, _defaults.defaultColdPhase[_constants.PHASE_INDEX_PRIORITY]), _phaseToDefaultIndexP); // We only care about whether the user has interacted with the priority of *any* phase at all.

      return [_constants.PHASE_HOT, _constants.PHASE_WARM, _constants.PHASE_COLD].some(function (phase) {
        // If the priority is different than the default, we'll consider it a user interaction,
        // even if the user has set it to undefined.
        return phases[phase] && (0, _lodash.get)(phases[phase], 'actions.set_priority.priority') !== phaseToDefaultIndexPriorityMap[phase];
      });
    }
  }, {
    metric: _constants.UIM_CONFIG_FREEZE_INDEX,
    isTracked: function isTracked() {
      return phases[_constants.PHASE_COLD] && (0, _lodash.get)(phases[_constants.PHASE_COLD], 'actions.freeze');
    }
  }];
  var trackedUiMetrics = phaseUiMetrics.reduce(function (tracked, _ref) {
    var metric = _ref.metric,
        isTracked = _ref.isTracked;

    if (isTracked()) {
      tracked.push(metric);
    }

    return tracked;
  }, []);
  return trackedUiMetrics;
}