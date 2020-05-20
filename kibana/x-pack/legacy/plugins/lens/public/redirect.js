"use strict";

var _new_platform = require("ui/new_platform");

var _chrome = _interopRequireDefault(require("ui/chrome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// This file redirects lens urls starting with app/lens#... to their counterpart on app/kibana#lens/... to
// make sure it's compatible with the 7.5 release
_chrome.default.setRootController('lens', function () {
  // prefix the path in the hash with lens/
  var prefixedHashRoute = window.location.hash.replace(/^#\//, '#/lens/'); // redirect to the new lens url `app/kibana#/lens/...`

  window.location.href = _new_platform.npSetup.core.http.basePath.prepend('/app/kibana' + prefixedHashRoute);
});