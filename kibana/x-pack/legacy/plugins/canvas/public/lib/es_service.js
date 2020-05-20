"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultIndex = exports.getIndices = exports.getFields = void 0;

var _constants = require("../../common/lib/constants");

var _fetch = require("../../common/lib/fetch");

var _i18n = require("../../i18n");

var _notify = require("./notify");

var _legacy = require("../legacy");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
// @ts-ignore untyped local
var strings = _i18n.ErrorStrings.esService;

var getApiPath = function getApiPath() {
  var basePath = (0, _legacy.getCoreStart)().http.basePath.get();
  return basePath + _constants.API_ROUTE;
};

var getSavedObjectsClient = function getSavedObjectsClient() {
  return (0, _legacy.getCoreStart)().savedObjects.client;
};

var getAdvancedSettings = function getAdvancedSettings() {
  return (0, _legacy.getCoreStart)().uiSettings;
};

var getFields = function getFields() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '_all';
  return _fetch.fetch.get("".concat(getApiPath(), "/es_fields?index=").concat(index)).then(function (_ref) {
    var mapping = _ref.data;
    return Object.keys(mapping).filter(function (field) {
      return !field.startsWith('_');
    }) // filters out meta fields
    .sort();
  }).catch(function (err) {
    return _notify.notify.error(err, {
      title: strings.getFieldsFetchErrorMessage(index)
    });
  });
};

exports.getFields = getFields;

var getIndices = function getIndices() {
  return getSavedObjectsClient().find({
    type: 'index-pattern',
    fields: ['title'],
    searchFields: ['title'],
    perPage: 1000
  }).then(function (resp) {
    return resp.savedObjects.map(function (savedObject) {
      return savedObject.attributes.title;
    });
  }).catch(function (err) {
    return _notify.notify.error(err, {
      title: strings.getIndicesFetchErrorMessage()
    });
  });
};

exports.getIndices = getIndices;

var getDefaultIndex = function getDefaultIndex() {
  var defaultIndexId = getAdvancedSettings().get('defaultIndex');
  return defaultIndexId ? getSavedObjectsClient().get('index-pattern', defaultIndexId).then(function (defaultIndex) {
    return defaultIndex.attributes.title;
  }).catch(function (err) {
    return _notify.notify.error(err, {
      title: strings.getDefaultIndexFetchErrorMessage()
    });
  }) : Promise.resolve('');
};

exports.getDefaultIndex = getDefaultIndex;