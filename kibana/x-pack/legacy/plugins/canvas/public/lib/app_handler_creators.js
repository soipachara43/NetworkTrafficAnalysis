"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoomHandlerCreators = void 0;

var _constants = require("../../common/lib/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// handlers for zooming in and out
var zoomHandlerCreators = {
  zoomIn: function zoomIn(_ref) {
    var zoomScale = _ref.zoomScale,
        setZoomScale = _ref.setZoomScale;
    return function () {
      var scaleUp = _constants.ZOOM_LEVELS.find(function (zoomLevel) {
        return zoomScale < zoomLevel;
      }) || _constants.MAX_ZOOM_LEVEL;

      setZoomScale(scaleUp);
    };
  },
  zoomOut: function zoomOut(_ref2) {
    var zoomScale = _ref2.zoomScale,
        setZoomScale = _ref2.setZoomScale;
    return function () {
      var scaleDown = _constants.ZOOM_LEVELS.slice().reverse().find(function (zoomLevel) {
        return zoomScale > zoomLevel;
      }) || _constants.MIN_ZOOM_LEVEL;

      setZoomScale(scaleDown);
    };
  },
  resetZoom: function resetZoom(_ref3) {
    var setZoomScale = _ref3.setZoomScale;
    return function () {
      setZoomScale(1);
    };
  }
};
exports.zoomHandlerCreators = zoomHandlerCreators;