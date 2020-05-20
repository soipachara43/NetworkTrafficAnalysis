"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFatalErrors = exports.getNotifications = exports.setNotifications = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var _notifications;

var _fatalErrors;

var setNotifications = function setNotifications(notifications, fatalErrorsSetup) {
  _notifications = notifications.toasts;
  _fatalErrors = fatalErrorsSetup;
};

exports.setNotifications = setNotifications;

var getNotifications = function getNotifications() {
  return _notifications;
};

exports.getNotifications = getNotifications;

var getFatalErrors = function getFatalErrors() {
  return _fatalErrors;
};

exports.getFatalErrors = getFatalErrors;