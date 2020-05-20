"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorListActionsPopover = void 0;

var _reactRedux = require("react-redux");

var _selectors = require("../../../state/selectors");

var _actions = require("../../../state/actions");

var _monitor_list_drawer = require("../../functional/monitor_list/monitor_list_drawer");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    popoverState: (0, _selectors.isIntegrationsPopupOpen)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    togglePopoverIsVisible: function togglePopoverIsVisible(popoverState) {
      return dispatch((0, _actions.toggleIntegrationsPopover)(popoverState));
    }
  };
};

var MonitorListActionsPopover = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_monitor_list_drawer.MonitorListActionsPopoverComponent);
exports.MonitorListActionsPopover = MonitorListActionsPopover;