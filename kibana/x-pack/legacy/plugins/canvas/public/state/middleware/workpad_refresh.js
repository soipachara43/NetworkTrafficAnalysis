"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workpadRefresh = void 0;

var _elements = require("../actions/elements");

var _workpad = require("../actions/workpad");

var _resolved_args = require("../actions/resolved_args");

var _resolved_args2 = require("../selectors/resolved_args");

var _workpad2 = require("../selectors/workpad");

var _app_state = require("../../lib/app_state");

var _time_interval = require("../../lib/time_interval");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped Local
// @ts-ignore Untyped Local
var workpadRefresh = function workpadRefresh(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    var refreshTimeout;
    var refreshInterval = 0;

    function updateWorkpad() {
      cancelDelayedUpdate();

      if (refreshInterval === 0) {
        return;
      } // check the request in flight status


      var inFlightActive = (0, _resolved_args2.getInFlight)(getState());

      if (inFlightActive) {
        // if requests are in-flight, start the refresh delay again
        startDelayedUpdate();
      } else {
        // update the elements on the workpad
        dispatch((0, _elements.fetchAllRenderables)());
      }
    }

    function cancelDelayedUpdate() {
      clearTimeout(refreshTimeout);
      refreshTimeout = undefined;
    }

    function startDelayedUpdate() {
      if (!refreshTimeout) {
        clearTimeout(refreshTimeout); // cancel any pending update requests

        refreshTimeout = window.setTimeout(function () {
          updateWorkpad();
        }, refreshInterval);
      }
    }

    return function (action) {
      var previousRefreshInterval = (0, _workpad2.getRefreshInterval)(getState());
      next(action);
      refreshInterval = (0, _workpad2.getRefreshInterval)(getState()); // when in-flight requests are finished, update the workpad after a given delay

      if (action.type === _resolved_args.inFlightComplete.toString() && refreshInterval > 0) {
        startDelayedUpdate();
      } // create new update request
      // This middleware creates or destroys an interval that will cause workpad elements to update


      if (action.type === _workpad.setRefreshInterval.toString() && previousRefreshInterval !== refreshInterval) {
        // update the refresh interval
        refreshInterval = action.payload;
        (0, _app_state.setRefreshInterval)((0, _time_interval.createTimeInterval)(refreshInterval)); // clear any pending timeout

        cancelDelayedUpdate(); // if interval is larger than 0, start the delayed update

        if (refreshInterval > 0) {
          startDelayedUpdate();
        }
      }
    };
  };
};

exports.workpadRefresh = workpadRefresh;