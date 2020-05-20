"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolTipShortcut = void 0;

var _recompose = require("recompose");

var _tool_tip_shortcut = require("./tool_tip_shortcut");

var _get_client_platform = require("../../lib/get_client_platform");

var _keymap = require("../../lib/keymap");

var _get_pretty_shortcut = require("../../lib/get_pretty_shortcut");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var os = (0, _get_client_platform.getClientPlatform)();
var ToolTipShortcut = (0, _recompose.compose)((0, _recompose.mapProps)(function (_ref) {
  var namespace = _ref.namespace,
      action = _ref.action;
  var shortcutMap = _keymap.keymap[namespace][action];

  if (typeof shortcutMap === 'string') {
    return {
      shortcut: ''
    };
  }

  var shortcuts = shortcutMap[os] || [];
  return {
    shortcut: (0, _get_pretty_shortcut.getPrettyShortcut)(shortcuts[0])
  };
}))(_tool_tip_shortcut.ToolTipShortcut);
exports.ToolTipShortcut = ToolTipShortcut;