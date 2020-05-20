"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlSettings = void 0;

var _reactRedux = require("react-redux");

var _workpad = require("../../../state/actions/workpad");

var _workpad2 = require("../../../state/selectors/workpad");

var _control_settings = require("./control_settings");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
var mapStateToProps = function mapStateToProps(state) {
  var _getAutoplay = (0, _workpad2.getAutoplay)(state),
      enabled = _getAutoplay.enabled,
      interval = _getAutoplay.interval;

  return {
    refreshInterval: (0, _workpad2.getRefreshInterval)(state),
    autoplayEnabled: enabled,
    autoplayInterval: interval
  };
};

var mapDispatchToProps = {
  setRefreshInterval: _workpad.setRefreshInterval,
  enableAutoplay: _workpad.enableAutoplay,
  setAutoplayInterval: _workpad.setAutoplayInterval
};
var ControlSettings = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_control_settings.ControlSettings);
exports.ControlSettings = ControlSettings;