"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAGE_BADGE_TOOLTIP = exports.PAGE_BADGE_LABEL = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_BADGE_LABEL = _i18n.i18n.translate('xpack.siem.case.caseView.pageBadgeLabel', {
  defaultMessage: 'Beta'
});

exports.PAGE_BADGE_LABEL = PAGE_BADGE_LABEL;

var PAGE_BADGE_TOOLTIP = _i18n.i18n.translate('xpack.siem.case.caseView.pageBadgeTooltip', {
  defaultMessage: 'Case Workflow is still in beta. Please help us improve by reporting issues or bugs in the Kibana repo.'
});

exports.PAGE_BADGE_TOOLTIP = PAGE_BADGE_TOOLTIP;