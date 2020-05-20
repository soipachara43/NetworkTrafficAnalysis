"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationMap = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _location_status_tags = require("./location_status_tags");

var _embedded_map = require("./embeddables/embedded_map");

var _constants = require("../../../../common/constants");

var _location_missing = require("./location_missing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// These height/width values are used to make sure map is in center of panel
// And to make sure, it doesn't take too much space
var MapPanel = _styledComponents.default.div.withConfig({
  displayName: "MapPanel",
  componentId: "sc-1ylejfw-0"
})(["height:240px;width:520px;@media (min-width:1300px){margin-right:20px;}@media (max-width:574px){height:250px;width:100%;margin-right:0;}"]);

var EuiFlexItemTags = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiFlexItemTags",
  componentId: "sc-1ylejfw-1"
})(["padding-top:5px;@media (max-width:850px){order:1;}"]);
var FlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FlexGroup",
  componentId: "sc-1ylejfw-2"
})(["@media (max-width:850px){justify-content:center;}"]);

var LocationMap = function LocationMap(_ref) {
  var monitorLocations = _ref.monitorLocations;
  var upPoints = [];
  var downPoints = [];
  var isGeoInfoMissing = false;

  if (monitorLocations === null || monitorLocations === void 0 ? void 0 : monitorLocations.locations) {
    monitorLocations.locations.forEach(function (item) {
      var _item$geo, _item$geo2, _item$geo3;

      if (((_item$geo = item.geo) === null || _item$geo === void 0 ? void 0 : _item$geo.name) === _constants.UNNAMED_LOCATION || !((_item$geo2 = item.geo) === null || _item$geo2 === void 0 ? void 0 : _item$geo2.location)) {
        isGeoInfoMissing = true;
      } else if (((_item$geo3 = item.geo) === null || _item$geo3 === void 0 ? void 0 : _item$geo3.name) !== _constants.UNNAMED_LOCATION && !!item.geo.location.lat && !!item.geo.location.lon) {
        var _item$summary;

        // TypeScript doesn't infer that the above checks in this block's condition
        // ensure that lat and lon are defined when we try to pass the location object directly,
        // but if we destructure the values it does. Improvement to this block is welcome.
        var _item$geo$location = item.geo.location,
            lat = _item$geo$location.lat,
            lon = _item$geo$location.lon;

        if ((item === null || item === void 0 ? void 0 : (_item$summary = item.summary) === null || _item$summary === void 0 ? void 0 : _item$summary.down) === 0) {
          upPoints.push({
            lat: lat,
            lon: lon
          });
        } else {
          downPoints.push({
            lat: lat,
            lon: lon
          });
        }
      }
    });
  }

  return _react.default.createElement(_eui.EuiErrorBoundary, null, _react.default.createElement(FlexGroup, {
    wrap: true,
    gutterSize: "none"
  }, _react.default.createElement(EuiFlexItemTags, null, _react.default.createElement(_location_status_tags.LocationStatusTags, {
    locations: (monitorLocations === null || monitorLocations === void 0 ? void 0 : monitorLocations.locations) || []
  })), _react.default.createElement(_eui.EuiHideFor, {
    sizes: ['xs']
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isGeoInfoMissing && _react.default.createElement(_location_missing.LocationMissingWarning, null), _react.default.createElement(MapPanel, null, _react.default.createElement(_embedded_map.EmbeddedMap, {
    upPoints: upPoints,
    downPoints: downPoints
  }))))));
};

exports.LocationMap = LocationMap;