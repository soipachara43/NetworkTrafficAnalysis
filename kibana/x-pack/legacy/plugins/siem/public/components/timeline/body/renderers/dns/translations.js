"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WITH_QUESTION_TYPE = exports.WHICH_RESOLVED_TO = exports.VIA = exports.RESPONSE_CODE = exports.ASKED_FOR = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ASKED_FOR = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.dns.askedForDescription', {
  defaultMessage: 'asked for'
});

exports.ASKED_FOR = ASKED_FOR;

var RESPONSE_CODE = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.dns.responseCodeDescription', {
  defaultMessage: 'response code:'
});

exports.RESPONSE_CODE = RESPONSE_CODE;

var VIA = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.dns.viaDescription', {
  defaultMessage: 'via'
});

exports.VIA = VIA;

var WHICH_RESOLVED_TO = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.dns.whichResolvedToDescription', {
  defaultMessage: ', which resolved to'
});

exports.WHICH_RESOLVED_TO = WHICH_RESOLVED_TO;

var WITH_QUESTION_TYPE = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.dns.withQuestionTypeDescription', {
  defaultMessage: 'with question type'
});

exports.WITH_QUESTION_TYPE = WITH_QUESTION_TYPE;