"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WITH_SPECIAL_PRIVILEGES = exports.VIA = exports.USING_LOGON_TYPE = exports.TO = exports.TARGET_LOGON_ID = exports.SUCCESSFULLY_LOGGED_IN = exports.SUBJECT_LOGON_ID = exports.LOGON_TYPE_UNLOCK = exports.LOGON_TYPE_SERVICE = exports.LOGON_TYPE_REMOTE_INTERACTIVE = exports.LOGON_TYPE_NEW_CREDENTIALS = exports.LOGON_TYPE_NETWORK_CLEARTEXT = exports.LOGON_TYPE_NETWORK = exports.LOGON_TYPE_INTERACTIVE = exports.LOGON_TYPE_CACHED_INTERACTIVE = exports.LOGON_TYPE_BATCH = exports.LOGGED_OFF = exports.AS_REQUESTED_BY_SUBJECT = exports.A_LOGIN_WAS_ATTEMPTED_USING_EXPLICIT_CREDENTIALS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var A_LOGIN_WAS_ATTEMPTED_USING_EXPLICIT_CREDENTIALS = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.aLoginWasAttemptedUsingExplicitCredentialsDescription', {
  defaultMessage: 'A login was attempted using explicit credentials'
});

exports.A_LOGIN_WAS_ATTEMPTED_USING_EXPLICIT_CREDENTIALS = A_LOGIN_WAS_ATTEMPTED_USING_EXPLICIT_CREDENTIALS;

var AS_REQUESTED_BY_SUBJECT = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.asRequestedBySubjectDescription', {
  defaultMessage: 'as requested by subject'
});

exports.AS_REQUESTED_BY_SUBJECT = AS_REQUESTED_BY_SUBJECT;

var LOGGED_OFF = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.loggedOffDescription', {
  defaultMessage: 'logged off'
});

exports.LOGGED_OFF = LOGGED_OFF;

var LOGON_TYPE_BATCH = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeBatchDescription', {
  defaultMessage: 'Batch'
});

exports.LOGON_TYPE_BATCH = LOGON_TYPE_BATCH;

var LOGON_TYPE_CACHED_INTERACTIVE = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeCachedInteractiveDescription', {
  defaultMessage: 'Cached Interactive'
});

exports.LOGON_TYPE_CACHED_INTERACTIVE = LOGON_TYPE_CACHED_INTERACTIVE;

var LOGON_TYPE_INTERACTIVE = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeInteractiveDescription', {
  defaultMessage: 'Interactive'
});

exports.LOGON_TYPE_INTERACTIVE = LOGON_TYPE_INTERACTIVE;

var LOGON_TYPE_NETWORK = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeNetworkDescription', {
  defaultMessage: 'Network'
});

exports.LOGON_TYPE_NETWORK = LOGON_TYPE_NETWORK;

var LOGON_TYPE_NETWORK_CLEARTEXT = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeNetworkCleartextDescription', {
  defaultMessage: 'Network Cleartext'
});

exports.LOGON_TYPE_NETWORK_CLEARTEXT = LOGON_TYPE_NETWORK_CLEARTEXT;

var LOGON_TYPE_NEW_CREDENTIALS = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeNewCredentialsDescription', {
  defaultMessage: 'New Credentials'
});

exports.LOGON_TYPE_NEW_CREDENTIALS = LOGON_TYPE_NEW_CREDENTIALS;

var LOGON_TYPE_REMOTE_INTERACTIVE = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeRemoteInteractiveDescription', {
  defaultMessage: 'Remote Interactive'
});

exports.LOGON_TYPE_REMOTE_INTERACTIVE = LOGON_TYPE_REMOTE_INTERACTIVE;

var LOGON_TYPE_SERVICE = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeServiceDescription', {
  defaultMessage: 'Service'
});

exports.LOGON_TYPE_SERVICE = LOGON_TYPE_SERVICE;

var LOGON_TYPE_UNLOCK = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.logonTypeUnlockDescription', {
  defaultMessage: 'Unlock'
});

exports.LOGON_TYPE_UNLOCK = LOGON_TYPE_UNLOCK;

var SUBJECT_LOGON_ID = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.subjectLogonIdDescription', {
  defaultMessage: 'subject logon ID'
});

exports.SUBJECT_LOGON_ID = SUBJECT_LOGON_ID;

var SUCCESSFULLY_LOGGED_IN = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.successfullyLoggedInDescription', {
  defaultMessage: 'successfully logged in'
});

exports.SUCCESSFULLY_LOGGED_IN = SUCCESSFULLY_LOGGED_IN;

var TARGET_LOGON_ID = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.targetLogonIdDescription', {
  defaultMessage: 'target logon ID'
});

exports.TARGET_LOGON_ID = TARGET_LOGON_ID;

var TO = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.toDescription', {
  defaultMessage: 'to'
});

exports.TO = TO;

var USING_LOGON_TYPE = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.usingLogonTypeDescription', {
  defaultMessage: 'using logon type'
});

exports.USING_LOGON_TYPE = USING_LOGON_TYPE;

var VIA = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.viaDescription', {
  defaultMessage: 'via'
});

exports.VIA = VIA;

var WITH_SPECIAL_PRIVILEGES = _i18n.i18n.translate('xpack.siem.timeline.body.renderers.endgame.withSpecialPrivilegesDescription', {
  defaultMessage: 'With special privileges,'
});

exports.WITH_SPECIAL_PRIVILEGES = WITH_SPECIAL_PRIVILEGES;