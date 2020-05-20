"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Section = Section;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _KeyValueTable = require("../KeyValueTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function Section(_ref) {
  var keyValuePairs = _ref.keyValuePairs;

  if (!(0, _lodash.isEmpty)(keyValuePairs)) {
    return _react.default.createElement(_KeyValueTable.KeyValueTable, {
      keyValuePairs: keyValuePairs
    });
  }

  return _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.apm.propertiesTable.agentFeature.noDataAvailableLabel', {
    defaultMessage: 'No data available'
  }));
}