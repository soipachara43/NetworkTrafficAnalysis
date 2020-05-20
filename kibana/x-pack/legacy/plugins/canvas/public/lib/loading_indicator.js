"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingIndicator = exports.initLoadingIndicator = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isActive = false;
var loadingCount$ = new Rx.BehaviorSubject(0);

var initLoadingIndicator = function initLoadingIndicator(addLoadingCount) {
  return addLoadingCount(loadingCount$);
};

exports.initLoadingIndicator = initLoadingIndicator;
var loadingIndicator = {
  show: function show() {
    if (!isActive) {
      isActive = true;
      loadingCount$.next(1);
    }
  },
  hide: function hide() {
    if (isActive) {
      isActive = false;
      loadingCount$.next(0);
    }
  }
};
exports.loadingIndicator = loadingIndicator;