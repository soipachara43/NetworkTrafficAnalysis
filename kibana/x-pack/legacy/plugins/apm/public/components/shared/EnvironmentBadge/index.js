"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EnvironmentBadge = function EnvironmentBadge(_ref) {
  var _ref$environments = _ref.environments,
      environments = _ref$environments === void 0 ? [] : _ref$environments;

  if (environments.length < 3) {
    return _react.default.createElement(_react.default.Fragment, null, environments.map(function (env) {
      return _react.default.createElement(_eui.EuiBadge, {
        color: "hollow",
        key: env
      }, env);
    }));
  }

  return _react.default.createElement(_eui.EuiToolTip, {
    position: "right",
    content: environments.map(function (env) {
      return _react.default.createElement(_react.default.Fragment, {
        key: env
      }, env, _react.default.createElement("br", null));
    })
  }, _react.default.createElement(_eui.EuiBadge, null, _i18n.i18n.translate('xpack.apm.servicesTable.environmentCount', {
    values: {
      environmentCount: environments.length
    },
    defaultMessage: '{environmentCount, plural, one {1 environment} other {# environments}}'
  })));
};

exports.EnvironmentBadge = EnvironmentBadge;