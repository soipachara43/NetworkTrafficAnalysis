"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var locationDocsLink = 'https://www.elastic.co/guide/en/beats/heartbeat/current/configuration-observer-options.html';
/**
 * Renders some location text, or directs the user to the docs where
 * they can learn to configure location.
 */

var LocationLink = function LocationLink(_ref) {
  var location = _ref.location,
      textSize = _ref.textSize;
  return location ? _react.default.createElement(_eui.EuiText, {
    size: textSize || 's',
    grow: false
  }, location) : _react.default.createElement(_eui.EuiLink, {
    href: locationDocsLink,
    target: "_blank"
  }, _i18n.i18n.translate('xpack.uptime.monitorList.geoName.helpLinkAnnotation', {
    defaultMessage: 'Add location',
    description: 'Text that instructs the user to navigate to our docs to add a geographic location to their data'
  }), "\xA0", _react.default.createElement(_eui.EuiIcon, {
    size: "s",
    type: "popout"
  }));
};

exports.LocationLink = LocationLink;