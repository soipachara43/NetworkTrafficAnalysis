"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ALREADY_PUSHED_TO_SERVICE: true,
  REQUIRED_UPDATE_TO_SERVICE: true,
  COPY_REFERENCE_LINK: true,
  MOVE_TO_ORIGINAL_COMMENT: true
};
exports.MOVE_TO_ORIGINAL_COMMENT = exports.COPY_REFERENCE_LINK = exports.REQUIRED_UPDATE_TO_SERVICE = exports.ALREADY_PUSHED_TO_SERVICE = void 0;

var _i18n = require("@kbn/i18n");

var _translations = require("../case_view/translations");

Object.keys(_translations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _translations[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ALREADY_PUSHED_TO_SERVICE = _i18n.i18n.translate('xpack.siem.case.caseView.alreadyPushedToService', {
  defaultMessage: 'Already pushed to Service Now incident'
});

exports.ALREADY_PUSHED_TO_SERVICE = ALREADY_PUSHED_TO_SERVICE;

var REQUIRED_UPDATE_TO_SERVICE = _i18n.i18n.translate('xpack.siem.case.caseView.requiredUpdateToService', {
  defaultMessage: 'Requires update to ServiceNow incident'
});

exports.REQUIRED_UPDATE_TO_SERVICE = REQUIRED_UPDATE_TO_SERVICE;

var COPY_REFERENCE_LINK = _i18n.i18n.translate('xpack.siem.case.caseView.copyCommentLinkAria', {
  defaultMessage: 'Copy reference link'
});

exports.COPY_REFERENCE_LINK = COPY_REFERENCE_LINK;

var MOVE_TO_ORIGINAL_COMMENT = _i18n.i18n.translate('xpack.siem.case.caseView.moveToCommentAria', {
  defaultMessage: 'Highlight the referenced comment'
});

exports.MOVE_TO_ORIGINAL_COMMENT = MOVE_TO_ORIGINAL_COMMENT;