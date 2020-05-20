"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotHeading = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SnapshotHeading = function SnapshotHeading(_ref) {
  var total = _ref.total;
  var monitorsText = total === 1 ? _i18n.i18n.translate('xpack.uptime.snapshot.monitor', {
    defaultMessage: 'Monitor'
  }) : _i18n.i18n.translate('xpack.uptime.snapshot.monitors', {
    defaultMessage: 'Monitors'
  });
  return _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, total, " ", monitorsText));
};

exports.SnapshotHeading = SnapshotHeading;