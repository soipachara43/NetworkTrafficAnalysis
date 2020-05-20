"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DISMISS_CALLOUT = exports.READ_ONLY_SAVED_OBJECT_MSG = exports.READ_ONLY_SAVED_OBJECT_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var READ_ONLY_SAVED_OBJECT_TITLE = _i18n.i18n.translate('xpack.siem.case.readOnlySavedObjectTitle', {
  defaultMessage: 'You have read-only feature privileges'
});

exports.READ_ONLY_SAVED_OBJECT_TITLE = READ_ONLY_SAVED_OBJECT_TITLE;

var READ_ONLY_SAVED_OBJECT_MSG = _i18n.i18n.translate('xpack.siem.case.readOnlySavedObjectDescription', {
  defaultMessage: 'You are only allowed to view cases. If you need to open and update cases, contact your Kibana administrator'
});

exports.READ_ONLY_SAVED_OBJECT_MSG = READ_ONLY_SAVED_OBJECT_MSG;

var DISMISS_CALLOUT = _i18n.i18n.translate('xpack.siem.case.dismissErrorsPushServiceCallOutTitle', {
  defaultMessage: 'Dismiss'
});

exports.DISMISS_CALLOUT = DISMISS_CALLOUT;