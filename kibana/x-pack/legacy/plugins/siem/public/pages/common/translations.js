"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMPTY_ACTION_SECONDARY = exports.EMPTY_ACTION_PRIMARY = exports.EMPTY_MESSAGE = exports.EMPTY_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EMPTY_TITLE = _i18n.i18n.translate('xpack.siem.pages.common.emptyTitle', {
  defaultMessage: 'Welcome to SIEM. Let’s get you started.'
});

exports.EMPTY_TITLE = EMPTY_TITLE;

var EMPTY_MESSAGE = _i18n.i18n.translate('xpack.siem.pages.common.emptyMessage', {
  defaultMessage: 'To begin using security information and event management (SIEM), you’ll need to add SIEM-related data, in Elastic Common Schema (ECS) format, to the Elastic Stack. An easy way to get started is by installing and configuring our data shippers, called Beats. Let’s do that now!'
});

exports.EMPTY_MESSAGE = EMPTY_MESSAGE;

var EMPTY_ACTION_PRIMARY = _i18n.i18n.translate('xpack.siem.pages.common.emptyActionPrimary', {
  defaultMessage: 'Add data with Beats'
});

exports.EMPTY_ACTION_PRIMARY = EMPTY_ACTION_PRIMARY;

var EMPTY_ACTION_SECONDARY = _i18n.i18n.translate('xpack.siem.pages.common.emptyActionSecondary', {
  defaultMessage: 'View getting started guide'
});

exports.EMPTY_ACTION_SECONDARY = EMPTY_ACTION_SECONDARY;