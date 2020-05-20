"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoFollowPatternActionMenu = void 0;

var _reactRedux = require("react-redux");

var _auto_follow_pattern_action_menu = require("./auto_follow_pattern_action_menu");

var _actions = require("../../store/actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    pauseAutoFollowPattern: function pauseAutoFollowPattern(ids) {
      dispatch((0, _actions.pauseAutoFollowPattern)(ids));
    },
    resumeAutoFollowPattern: function resumeAutoFollowPattern(ids) {
      dispatch((0, _actions.resumeAutoFollowPattern)(ids));
    }
  };
};

var AutoFollowPatternActionMenu = (0, _reactRedux.connect)(null, mapDispatchToProps)(_auto_follow_pattern_action_menu.AutoFollowPatternActionMenu);
exports.AutoFollowPatternActionMenu = AutoFollowPatternActionMenu;