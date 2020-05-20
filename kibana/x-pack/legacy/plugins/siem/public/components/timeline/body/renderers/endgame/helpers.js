"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventDetails = exports.getUserNameField = exports.getUserDomainField = exports.getTargetUserAndTargetDomain = exports.getHostNameSeparator = exports.getHumanReadableLogonType = void 0;

var _helpers = require("../helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getHumanReadableLogonType = function getHumanReadableLogonType(endgameLogonType) {
  if ((0, _helpers.isNillEmptyOrNotFinite)(endgameLogonType)) {
    return '';
  }

  switch (endgameLogonType) {
    case 2:
      return i18n.LOGON_TYPE_INTERACTIVE;

    case 3:
      return i18n.LOGON_TYPE_NETWORK;

    case 4:
      return i18n.LOGON_TYPE_BATCH;

    case 5:
      return i18n.LOGON_TYPE_SERVICE;

    case 7:
      return i18n.LOGON_TYPE_UNLOCK;

    case 8:
      return i18n.LOGON_TYPE_NETWORK_CLEARTEXT;

    case 9:
      return i18n.LOGON_TYPE_NEW_CREDENTIALS;

    case 10:
      return i18n.LOGON_TYPE_REMOTE_INTERACTIVE;

    case 11:
      return i18n.LOGON_TYPE_CACHED_INTERACTIVE;

    default:
      return "".concat(endgameLogonType);
  }
};

exports.getHumanReadableLogonType = getHumanReadableLogonType;

var getHostNameSeparator = function getHostNameSeparator(eventAction) {
  return eventAction === 'explicit_user_logon' ? i18n.TO : '@';
};

exports.getHostNameSeparator = getHostNameSeparator;

var getTargetUserAndTargetDomain = function getTargetUserAndTargetDomain(eventAction) {
  return eventAction === 'explicit_user_logon' || eventAction === 'user_logoff';
};

exports.getTargetUserAndTargetDomain = getTargetUserAndTargetDomain;

var getUserDomainField = function getUserDomainField(eventAction) {
  return getTargetUserAndTargetDomain(eventAction) ? 'endgame.target_domain_name' : 'user.domain';
};

exports.getUserDomainField = getUserDomainField;

var getUserNameField = function getUserNameField(eventAction) {
  return getTargetUserAndTargetDomain(eventAction) ? 'endgame.target_user_name' : 'user.name';
};

exports.getUserNameField = getUserNameField;

var getEventDetails = function getEventDetails(eventAction) {
  switch (eventAction) {
    case 'explicit_user_logon':
      return '';
    // no details

    case 'user_logoff':
      return i18n.LOGGED_OFF;

    default:
      return i18n.SUCCESSFULLY_LOGGED_IN;
  }
};

exports.getEventDetails = getEventDetails;