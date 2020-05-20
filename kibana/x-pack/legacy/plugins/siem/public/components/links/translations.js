"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CASE_DETAILS_LINK_ARIA: true
};
exports.CASE_DETAILS_LINK_ARIA = void 0;

var _i18n = require("@kbn/i18n");

var _translations = require("../page/network/ip_overview/translations");

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
var CASE_DETAILS_LINK_ARIA = function CASE_DETAILS_LINK_ARIA(detailName) {
  return _i18n.i18n.translate('xpack.siem.case.caseTable.caseDetailsLinkAria', {
    values: {
      detailName: detailName
    },
    defaultMessage: 'click to visit case with title {detailName}'
  });
};

exports.CASE_DETAILS_LINK_ARIA = CASE_DETAILS_LINK_ARIA;