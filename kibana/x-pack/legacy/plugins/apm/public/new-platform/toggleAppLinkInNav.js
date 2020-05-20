"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleAppLinkInNav = toggleAppLinkInNav;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function toggleAppLinkInNav(core, _ref) {
  var ui = _ref.ui;

  if (ui.enabled === false) {
    core.chrome.navLinks.update('apm', {
      hidden: true
    });
  }
}