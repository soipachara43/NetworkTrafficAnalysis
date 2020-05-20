"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ADVANCED_SETTINGS_LINK_TITLE = exports.NO_NEWS_MESSAGE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NO_NEWS_MESSAGE = _i18n.i18n.translate('xpack.siem.newsFeed.noNewsMessage', {
  defaultMessage: 'Your current news feed URL returned no recent news. You may update the URL or disable security news via'
});

exports.NO_NEWS_MESSAGE = NO_NEWS_MESSAGE;

var ADVANCED_SETTINGS_LINK_TITLE = _i18n.i18n.translate('xpack.siem.newsFeed.advancedSettingsLinkTitle', {
  defaultMessage: 'SIEM advanced settings'
});

exports.ADVANCED_SETTINGS_LINK_TITLE = ADVANCED_SETTINGS_LINK_TITLE;