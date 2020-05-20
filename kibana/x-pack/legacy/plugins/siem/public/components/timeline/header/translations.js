"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALL_OUT_UNAUTHORIZED_MSG = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CALL_OUT_UNAUTHORIZED_MSG = _i18n.i18n.translate('xpack.siem.timeline.callOut.unauthorized.message.description', {
  defaultMessage: 'You require permission to auto-save timelines within the SIEM application, though you may continue to use the timeline to search and filter security events'
});

exports.CALL_OUT_UNAUTHORIZED_MSG = CALL_OUT_UNAUTHORIZED_MSG;