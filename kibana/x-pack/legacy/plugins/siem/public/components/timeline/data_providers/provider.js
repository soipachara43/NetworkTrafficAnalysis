"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _data_provider = require("./data_provider");

var _provider_item_badge = require("./provider_item_badge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Provider = _react.default.memo(function (_ref) {
  var dataProvider = _ref.dataProvider;
  return _react.default.createElement(_provider_item_badge.ProviderItemBadge, {
    deleteProvider: _fp.noop,
    field: dataProvider.queryMatch.displayField || dataProvider.queryMatch.field,
    kqlQuery: dataProvider.kqlQuery,
    isEnabled: dataProvider.enabled,
    isExcluded: dataProvider.excluded,
    providerId: dataProvider.id,
    toggleExcludedProvider: _fp.noop,
    toggleEnabledProvider: _fp.noop,
    val: dataProvider.queryMatch.displayValue || dataProvider.queryMatch.value,
    operator: dataProvider.queryMatch.operator || _data_provider.IS_OPERATOR
  });
});

exports.Provider = Provider;
Provider.displayName = 'Provider';