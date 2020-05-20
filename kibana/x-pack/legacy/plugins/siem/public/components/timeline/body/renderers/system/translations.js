"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WITH_EXIT_CODE = exports.VIA_PARENT_PROCESS = exports.VIA = exports.USER_REMOVED = exports.PACKAGE_REMOVED = exports.PACKAGE_UPDATED = exports.ACCEPTED = exports.BOOT = exports.PACKAGE_INSTALLED = exports.ERROR = exports.PROCESS_ERROR = exports.USER_ADDED = exports.HOST_CHANGED = exports.USER_CHANGED = exports.INVALID = exports.EXISTING_PACKAGE = exports.EXISTING_SOCKET = exports.EXISTING_USER = exports.SOCKET_CLOSED = exports.SOCKET_OPENED = exports.EXISTING_PROCESS = exports.DELETED_FILE = exports.CREATED_FILE = exports.TERMINATED_PROCESS = exports.PROCESS_STOPPED = exports.PROCESS_STARTED = exports.USING = exports.LOGGED_OUT = exports.DISCONNECTED_VIA = exports.ATTEMPTED_LOGIN = exports.ACCEPTED_A_CONNECTION_VIA = exports.WAS_AUTHORIZED_TO_USE = exports.WITH_RESULT = exports.SESSION = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Note for translators and programmers
// Examples of these strings are all of the form
// Session {user.name}@{hostname} in {folder} was authorized to use {executable} with result {result.success/failure}
// E.x. Frank@server-1 in /root was authorized to use wget with result success
// However, the strings can be dropped depending on the circumstances of the variables. For example, with no data at all
// Example with just a user name and hostname
// Session 20 frank@server-1
// Example with user name, hostname, but no result
// Session 20 frank@server-1 started process curl
var SESSION = _i18n.i18n.translate('xpack.siem.system.systemDescription', {
  defaultMessage: 'System'
});

exports.SESSION = SESSION;

var WITH_RESULT = _i18n.i18n.translate('xpack.siem.system.withResultDescription', {
  defaultMessage: 'with result'
});

exports.WITH_RESULT = WITH_RESULT;

var WAS_AUTHORIZED_TO_USE = _i18n.i18n.translate('xpack.siem.system.wasAuthorizedToUseDescription', {
  defaultMessage: 'was authorized to use'
});

exports.WAS_AUTHORIZED_TO_USE = WAS_AUTHORIZED_TO_USE;

var ACCEPTED_A_CONNECTION_VIA = _i18n.i18n.translate('xpack.siem.system.acceptedAConnectionViaDescription', {
  defaultMessage: 'accepted a connection via'
});

exports.ACCEPTED_A_CONNECTION_VIA = ACCEPTED_A_CONNECTION_VIA;

var ATTEMPTED_LOGIN = _i18n.i18n.translate('xpack.siem.system.attemptedLoginDescription', {
  defaultMessage: 'attempted a login via'
});

exports.ATTEMPTED_LOGIN = ATTEMPTED_LOGIN;

var DISCONNECTED_VIA = _i18n.i18n.translate('xpack.siem.system.disconnectedViaDescription', {
  defaultMessage: 'disconnected via'
});

exports.DISCONNECTED_VIA = DISCONNECTED_VIA;

var LOGGED_OUT = _i18n.i18n.translate('xpack.siem.system.loggedOutDescription', {
  defaultMessage: 'logged out via'
});

exports.LOGGED_OUT = LOGGED_OUT;

var USING = _i18n.i18n.translate('xpack.siem.system.usingDescription', {
  defaultMessage: 'using'
});

exports.USING = USING;

var PROCESS_STARTED = _i18n.i18n.translate('xpack.siem.system.processStartedDescription', {
  defaultMessage: 'started process'
});

exports.PROCESS_STARTED = PROCESS_STARTED;

var PROCESS_STOPPED = _i18n.i18n.translate('xpack.siem.system.processStoppedDescription', {
  defaultMessage: 'stopped process'
});

exports.PROCESS_STOPPED = PROCESS_STOPPED;

var TERMINATED_PROCESS = _i18n.i18n.translate('xpack.siem.system.terminatedProcessDescription', {
  defaultMessage: 'terminated process'
});

exports.TERMINATED_PROCESS = TERMINATED_PROCESS;

var CREATED_FILE = _i18n.i18n.translate('xpack.siem.system.createdFileDescription', {
  defaultMessage: 'created a file'
});

exports.CREATED_FILE = CREATED_FILE;

var DELETED_FILE = _i18n.i18n.translate('xpack.siem.system.deletedFileDescription', {
  defaultMessage: 'deleted a file'
});

exports.DELETED_FILE = DELETED_FILE;

var EXISTING_PROCESS = _i18n.i18n.translate('xpack.siem.system.existingProcessDescription', {
  defaultMessage: 'is running process'
});

exports.EXISTING_PROCESS = EXISTING_PROCESS;

var SOCKET_OPENED = _i18n.i18n.translate('xpack.siem.system.socketOpenedDescription', {
  defaultMessage: 'opened a socket with'
});

exports.SOCKET_OPENED = SOCKET_OPENED;

var SOCKET_CLOSED = _i18n.i18n.translate('xpack.siem.system.socketClosedDescription', {
  defaultMessage: 'closed a socket with'
});

exports.SOCKET_CLOSED = SOCKET_CLOSED;

var EXISTING_USER = _i18n.i18n.translate('xpack.siem.system.existingUserDescription', {
  defaultMessage: 'is an existing user'
});

exports.EXISTING_USER = EXISTING_USER;

var EXISTING_SOCKET = _i18n.i18n.translate('xpack.siem.system.existingSocketDescription', {
  defaultMessage: 'is using an existing socket from'
});

exports.EXISTING_SOCKET = EXISTING_SOCKET;

var EXISTING_PACKAGE = _i18n.i18n.translate('xpack.siem.system.existingPackageDescription', {
  defaultMessage: 'is using an existing package'
});

exports.EXISTING_PACKAGE = EXISTING_PACKAGE;

var INVALID = _i18n.i18n.translate('xpack.siem.system.invalidDescription', {
  defaultMessage: 'attempted invalid usage of'
});

exports.INVALID = INVALID;

var USER_CHANGED = _i18n.i18n.translate('xpack.siem.system.userChangedDescription', {
  defaultMessage: 'user has changed'
});

exports.USER_CHANGED = USER_CHANGED;

var HOST_CHANGED = _i18n.i18n.translate('xpack.siem.system.hostDescription', {
  defaultMessage: 'host information'
});

exports.HOST_CHANGED = HOST_CHANGED;

var USER_ADDED = _i18n.i18n.translate('xpack.siem.system.userAddedDescription', {
  defaultMessage: 'user was added'
});

exports.USER_ADDED = USER_ADDED;

var PROCESS_ERROR = _i18n.i18n.translate('xpack.siem.system.processErrorDescription', {
  defaultMessage: 'encountered a process error with'
});

exports.PROCESS_ERROR = PROCESS_ERROR;

var ERROR = _i18n.i18n.translate('xpack.siem.system.errorDescription', {
  defaultMessage: 'encountered an error with'
});

exports.ERROR = ERROR;

var PACKAGE_INSTALLED = _i18n.i18n.translate('xpack.siem.system.packageInstalledDescription', {
  defaultMessage: 'installed package'
});

exports.PACKAGE_INSTALLED = PACKAGE_INSTALLED;

var BOOT = _i18n.i18n.translate('xpack.siem.system.packageSystemStartedDescription', {
  defaultMessage: 'system started'
});

exports.BOOT = BOOT;

var ACCEPTED = _i18n.i18n.translate('xpack.siem.system.acceptedDescription', {
  defaultMessage: 'accepted the user via'
});

exports.ACCEPTED = ACCEPTED;

var PACKAGE_UPDATED = _i18n.i18n.translate('xpack.siem.system.packageUpdatedDescription', {
  defaultMessage: 'updated package'
});

exports.PACKAGE_UPDATED = PACKAGE_UPDATED;

var PACKAGE_REMOVED = _i18n.i18n.translate('xpack.siem.system.packageRemovedDescription', {
  defaultMessage: 'removed package'
});

exports.PACKAGE_REMOVED = PACKAGE_REMOVED;

var USER_REMOVED = _i18n.i18n.translate('xpack.siem.system.userRemovedDescription', {
  defaultMessage: 'was removed'
});

exports.USER_REMOVED = USER_REMOVED;

var VIA = _i18n.i18n.translate('xpack.siem.system.viaDescription', {
  defaultMessage: 'via'
});

exports.VIA = VIA;

var VIA_PARENT_PROCESS = _i18n.i18n.translate('xpack.siem.system.viaParentProcessDescription', {
  defaultMessage: 'via parent process'
});

exports.VIA_PARENT_PROCESS = VIA_PARENT_PROCESS;

var WITH_EXIT_CODE = _i18n.i18n.translate('xpack.siem.system.withExitCodeDescription', {
  defaultMessage: 'with exit code'
});

exports.WITH_EXIT_CODE = WITH_EXIT_CODE;