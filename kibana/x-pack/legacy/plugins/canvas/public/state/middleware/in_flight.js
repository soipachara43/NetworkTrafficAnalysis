"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inFlight = exports.inFlightMiddlewareFactory = void 0;

var _loading_indicator = require("../../lib/loading_indicator");

var _modify_path = require("../../lib/modify_path");

var _resolved_args = require("../actions/resolved_args");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var pathToKey = function pathToKey(path) {
  return (0, _modify_path.convert)(path).join('/');
};

var inFlightMiddlewareFactory = function inFlightMiddlewareFactory(_ref) {
  var loadingIndicator = _ref.loadingIndicator,
      pendingCache = _ref.pendingCache;
  return function (_ref2) {
    var dispatch = _ref2.dispatch;
    return function (next) {
      return function (action) {
        if (action.type === _resolved_args.setLoadingActionType) {
          var cacheKey = pathToKey(action.payload.path);
          pendingCache.push(cacheKey);
          dispatch((0, _resolved_args.inFlightActive)());
        } else if (action.type === _resolved_args.setValueActionType) {
          var _cacheKey = pathToKey(action.payload.path);

          var idx = pendingCache.indexOf(_cacheKey);

          if (idx >= 0) {
            pendingCache.splice(idx, 1);
          }

          if (pendingCache.length === 0) {
            dispatch((0, _resolved_args.inFlightComplete)());
          }
        } else if (action.type === _resolved_args.inFlightActiveActionType) {
          loadingIndicator.show();
        } else if (action.type === _resolved_args.inFlightCompleteActionType) {
          loadingIndicator.hide();
        } // execute the action


        next(action);
      };
    };
  };
};

exports.inFlightMiddlewareFactory = inFlightMiddlewareFactory;
var inFlight = inFlightMiddlewareFactory({
  loadingIndicator: _loading_indicator.loadingIndicator,
  pendingCache: []
});
exports.inFlight = inFlight;