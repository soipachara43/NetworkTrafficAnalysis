"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitle = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTitle = function getTitle(name) {
  var appName = _i18n.i18n.translate('xpack.uptime.title', {
    defaultMessage: 'Uptime'
  });

  return "".concat(appName, " ").concat(name ? '| ' + name : '', " - Kibana");
};

exports.getTitle = getTitle;