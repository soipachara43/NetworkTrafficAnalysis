"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workpadAutoplay = void 0;

var _app = require("../selectors/app");

var _resolved_args = require("../selectors/resolved_args");

var _workpad = require("../selectors/workpad");

var _router_provider = require("../../lib/router_provider");

var _app_state = require("../../lib/app_state");

var _time_interval = require("../../lib/time_interval");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
var workpadAutoplay = function workpadAutoplay(_ref) {
  var getState = _ref.getState;
  return function (next) {
    var playTimeout;
    var displayInterval = 0;
    var router = (0, _router_provider.routerProvider)();

    function updateWorkpad() {
      if (displayInterval === 0) {
        return;
      } // check the request in flight status


      var inFlightActive = (0, _resolved_args.getInFlight)(getState()); // only navigate if no requests are in-flight

      if (!inFlightActive) {
        // update the elements on the workpad
        var workpadId = (0, _workpad.getWorkpad)(getState()).id;
        var pageIndex = (0, _workpad.getSelectedPageIndex)(getState());
        var pageCount = (0, _workpad.getPages)(getState()).length;
        var nextPage = Math.min(pageIndex + 1, pageCount - 1); // go to start if on the last page

        if (nextPage === pageIndex) {
          router.navigateTo('loadWorkpad', {
            id: workpadId,
            page: 1
          });
        } else {
          router.navigateTo('loadWorkpad', {
            id: workpadId,
            page: nextPage + 1
          });
        }
      }

      stopAutoUpdate();
      startDelayedUpdate();
    }

    function stopAutoUpdate() {
      clearTimeout(playTimeout); // cancel any pending update requests

      playTimeout = undefined;
    }

    function startDelayedUpdate() {
      if (!playTimeout) {
        stopAutoUpdate();
        playTimeout = window.setTimeout(function () {
          updateWorkpad();
        }, displayInterval);
      }
    }

    return function (action) {
      next(action);
      var isFullscreen = (0, _app.getFullscreen)(getState());
      var autoplay = (0, _workpad.getAutoplay)(getState());
      var shouldPlay = isFullscreen && autoplay.enabled && autoplay.interval > 0;
      displayInterval = autoplay.interval; // update appState

      if (autoplay.enabled) {
        (0, _app_state.setAutoplayInterval)((0, _time_interval.createTimeInterval)(autoplay.interval));
      } else {
        (0, _app_state.setAutoplayInterval)(null);
      } // if interval is larger than 0, start the delayed update


      if (shouldPlay) {
        startDelayedUpdate();
      } else {
        stopAutoUpdate();
      }
    };
  };
};

exports.workpadAutoplay = workpadAutoplay;