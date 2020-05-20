"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.telemetryMiddleware = void 0;

var _ = require("./");

var _actions = require("../../store/actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var telemetryMiddleware = function telemetryMiddleware(api) {
  return function (next) {
    return function (action) {
      if (_actions.timelineActions.endTimelineSaving.match(action)) {
        (0, _.track)(_.METRIC_TYPE.COUNT, _.TELEMETRY_EVENT.TIMELINE_SAVED);
      } else if (_actions.timelineActions.updateTitle.match(action)) {
        (0, _.track)(_.METRIC_TYPE.COUNT, _.TELEMETRY_EVENT.TIMELINE_NAMED);
      } else if (_actions.timelineActions.showTimeline.match(action)) {
        if (action.payload.show) {
          (0, _.track)(_.METRIC_TYPE.LOADED, _.TELEMETRY_EVENT.TIMELINE_OPENED);
        }
      }

      return next(action);
    };
  };
};

exports.telemetryMiddleware = telemetryMiddleware;