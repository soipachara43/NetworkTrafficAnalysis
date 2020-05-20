"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadZoom = void 0;

var _recompose = require("recompose");

var _reactRedux = require("react-redux");

var _app = require("../../../state/selectors/app");

var _workpad = require("../../../state/selectors/workpad");

var _transient = require("../../../state/actions/transient");

var _app_handler_creators = require("../../../lib/app_handler_creators");

var _workpad_zoom = require("./workpad_zoom");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore unconverted local file
var mapStateToProps = function mapStateToProps(state) {
  return {
    zoomScale: (0, _app.getZoomScale)(state),
    boundingBox: (0, _workpad.getWorkpadBoundingBox)(state),
    workpadWidth: (0, _workpad.getWorkpadWidth)(state),
    workpadHeight: (0, _workpad.getWorkpadHeight)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setZoomScale: function setZoomScale(scale) {
      return dispatch((0, _transient.setZoomScale)(scale));
    }
  };
};

var WorkpadZoom = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _recompose.withHandlers)(_app_handler_creators.zoomHandlerCreators))(_workpad_zoom.WorkpadZoom);
exports.WorkpadZoom = WorkpadZoom;