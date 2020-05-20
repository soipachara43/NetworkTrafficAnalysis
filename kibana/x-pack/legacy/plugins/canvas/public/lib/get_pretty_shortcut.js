"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrettyShortcut = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getPrettyShortcut = function getPrettyShortcut(shortcut) {
  if (!shortcut) {
    return '';
  }

  var result = shortcut.toUpperCase();
  result = result.replace(/command/i, '⌘');
  result = result.replace(/option/i, '⌥');
  result = result.replace(/left/i, '←');
  result = result.replace(/right/i, '→');
  result = result.replace(/up/i, '↑');
  result = result.replace(/down/i, '↓');
  result = result.replace(/plus/i, '+');
  result = result.replace(/minus/i, '-');
  return result;
};

exports.getPrettyShortcut = getPrettyShortcut;