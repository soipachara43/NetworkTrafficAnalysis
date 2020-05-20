"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClipboardData = exports.setClipboardData = void 0;

var _public = require("../../../../../../src/plugins/kibana_utils/public");

var _constants = require("../../common/lib/constants");

var _get_window = require("./get_window");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var storage;

var getStorage = function getStorage() {
  if (!storage) {
    storage = new _public.Storage((0, _get_window.getWindow)().localStorage);
  }

  return storage;
};

var setClipboardData = function setClipboardData(data) {
  getStorage().set(_constants.LOCALSTORAGE_CLIPBOARD, JSON.stringify(data));
};

exports.setClipboardData = setClipboardData;

var getClipboardData = function getClipboardData() {
  return getStorage().get(_constants.LOCALSTORAGE_CLIPBOARD);
};

exports.getClipboardData = getClipboardData;