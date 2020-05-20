"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusByLocations = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StatusByLocations = function StatusByLocations(_ref) {
  var locations = _ref.locations;
  var upLocations = [];
  var downLocations = [];
  if (locations) locations.forEach(function (item) {
    if (item.summary.down === 0) {
      upLocations.push(item.geo.name);
    } else {
      downLocations.push(item.geo.name);
    }
  });
  var statusMessage = '';
  var status = '';

  if (downLocations.length === 0) {
    // for Messaging like 'Up in 1 Location' or 'Up in 2 Locations'
    statusMessage = "".concat(locations.length);
    status = 'Up';
  } else if (downLocations.length > 0) {
    // for Messaging like 'Down in 1/2 Locations'
    status = 'Down';
    statusMessage = "".concat(downLocations.length, "/").concat(locations.length);

    if (downLocations.length === locations.length) {
      // for Messaging like 'Down in 2 Locations'
      statusMessage = "".concat(locations.length);
    }
  }

  return _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h2", null, locations.length <= 1 ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorStatusBar.locations.oneLocStatus",
    values: {
      status: status,
      loc: statusMessage
    },
    defaultMessage: "{status} in {loc} Location"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorStatusBar.locations.upStatus",
    values: {
      status: status,
      loc: statusMessage
    },
    defaultMessage: "{status} in {loc} Locations"
  })));
};

exports.StatusByLocations = StatusByLocations;