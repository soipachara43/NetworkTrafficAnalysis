"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotifications = getNotifications;
exports.setNotifications = setNotifications;
exports.getFatalErrors = getFatalErrors;
exports.setFatalErrors = setFatalErrors;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var notifications = null;
var fatalErrors = null;

function getNotifications() {
  if (!notifications) {
    throw new Error('Rollup notifications is not defined');
  }

  return notifications;
}

function setNotifications(newNotifications) {
  notifications = newNotifications;
}

function getFatalErrors() {
  if (!fatalErrors) {
    throw new Error('Rollup fatalErrors is not defined');
  }

  return fatalErrors;
}

function setFatalErrors(newFatalErrors) {
  fatalErrors = newFatalErrors;
}