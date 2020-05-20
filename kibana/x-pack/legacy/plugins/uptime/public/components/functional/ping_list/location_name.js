"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationName = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LocationName = function LocationName(_ref) {
  var location = _ref.location;
  return !!location ? _react.default.createElement(_eui.EuiText, null, location) : _react.default.createElement(_eui.EuiLink, {
    href: "https://www.elastic.co/guide/en/beats/heartbeat/current/configuration-observer-options.html",
    target: "_blank"
  }, _i18n.i18n.translate('xpack.uptime.locationName.helpLinkAnnotation', {
    defaultMessage: 'Add location',
    description: 'Text that instructs the user to navigate to our docs to add a geographic location to their data'
  }), "\xA0", _react.default.createElement(_eui.EuiIcon, {
    size: "s",
    type: "popout"
  }));
};

exports.LocationName = LocationName;