"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoFields = exports.getGeoFieldPropNameToFieldNameMap = exports.DESTINATION_GEO_CITY_NAME_FIELD_NAME = exports.DESTINATION_GEO_REGION_NAME_FIELD_NAME = exports.DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME = exports.DESTINATION_GEO_COUNTRY_NAME_FIELD_NAME = exports.DESTINATION_GEO_CONTINENT_NAME_FIELD_NAME = exports.SOURCE_GEO_CITY_NAME_FIELD_NAME = exports.SOURCE_GEO_REGION_NAME_FIELD_NAME = exports.SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME = exports.SOURCE_GEO_COUNTRY_NAME_FIELD_NAME = exports.SOURCE_GEO_CONTINENT_NAME_FIELD_NAME = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggables = require("../draggables");

var _country_flag = require("./country_flag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SOURCE_GEO_CONTINENT_NAME_FIELD_NAME = 'source.geo.continent_name';
exports.SOURCE_GEO_CONTINENT_NAME_FIELD_NAME = SOURCE_GEO_CONTINENT_NAME_FIELD_NAME;
var SOURCE_GEO_COUNTRY_NAME_FIELD_NAME = 'source.geo.country_name';
exports.SOURCE_GEO_COUNTRY_NAME_FIELD_NAME = SOURCE_GEO_COUNTRY_NAME_FIELD_NAME;
var SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME = 'source.geo.country_iso_code';
exports.SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME = SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME;
var SOURCE_GEO_REGION_NAME_FIELD_NAME = 'source.geo.region_name';
exports.SOURCE_GEO_REGION_NAME_FIELD_NAME = SOURCE_GEO_REGION_NAME_FIELD_NAME;
var SOURCE_GEO_CITY_NAME_FIELD_NAME = 'source.geo.city_name';
exports.SOURCE_GEO_CITY_NAME_FIELD_NAME = SOURCE_GEO_CITY_NAME_FIELD_NAME;
var DESTINATION_GEO_CONTINENT_NAME_FIELD_NAME = 'destination.geo.continent_name';
exports.DESTINATION_GEO_CONTINENT_NAME_FIELD_NAME = DESTINATION_GEO_CONTINENT_NAME_FIELD_NAME;
var DESTINATION_GEO_COUNTRY_NAME_FIELD_NAME = 'destination.geo.country_name';
exports.DESTINATION_GEO_COUNTRY_NAME_FIELD_NAME = DESTINATION_GEO_COUNTRY_NAME_FIELD_NAME;
var DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME = 'destination.geo.country_iso_code';
exports.DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME = DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME;
var DESTINATION_GEO_REGION_NAME_FIELD_NAME = 'destination.geo.region_name';
exports.DESTINATION_GEO_REGION_NAME_FIELD_NAME = DESTINATION_GEO_REGION_NAME_FIELD_NAME;
var DESTINATION_GEO_CITY_NAME_FIELD_NAME = 'destination.geo.city_name';
exports.DESTINATION_GEO_CITY_NAME_FIELD_NAME = DESTINATION_GEO_CITY_NAME_FIELD_NAME;
var geoPropNameToFieldNameSuffix = [{
  prop: 'GeoContinentName',
  fieldName: 'geo.continent_name'
}, {
  prop: 'GeoCountryName',
  fieldName: 'geo.country_name'
}, {
  prop: 'GeoCountryIsoCode',
  fieldName: 'geo.country_iso_code'
}, {
  prop: 'GeoRegionName',
  fieldName: 'geo.region_name'
}, {
  prop: 'GeoCityName',
  fieldName: 'geo.city_name'
}];

var getGeoFieldPropNameToFieldNameMap = function getGeoFieldPropNameToFieldNameMap(type) {
  return geoPropNameToFieldNameSuffix.map(function (_ref) {
    var prop = _ref.prop,
        fieldName = _ref.fieldName;
    return {
      prop: "".concat(type).concat(prop),
      fieldName: "".concat(type, ".").concat(fieldName)
    };
  });
};

exports.getGeoFieldPropNameToFieldNameMap = getGeoFieldPropNameToFieldNameMap;
var GeoFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "GeoFlexItem",
  componentId: "bz7oy6-0"
})(["margin-right:5px;"]);
GeoFlexItem.displayName = 'GeoFlexItem';

var GeoFieldValues = _react.default.memo(function (_ref2) {
  var contextId = _ref2.contextId,
      eventId = _ref2.eventId,
      fieldName = _ref2.fieldName,
      values = _ref2.values;
  return values != null ? _react.default.createElement(_react.default.Fragment, null, (0, _fp.uniq)(values).map(function (value) {
    return _react.default.createElement(GeoFlexItem, {
      grow: false,
      key: "".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value)
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      gutterSize: "none"
    }, fieldName === SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME || fieldName === DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_country_flag.CountryFlag, {
      countryCode: value
    })) : null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_draggables.DefaultDraggable, {
      "data-test-subj": fieldName,
      field: fieldName,
      id: "geo-field-values-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value),
      tooltipContent: fieldName,
      value: value
    }))));
  })) : null;
});

GeoFieldValues.displayName = 'GeoFieldValues';
/**
 * Renders a row of draggable text containing geographic fields, such as:
 * - `source|destination.geo.continent_name`
 * - `source|destination.geo.country_name`
 * - `source|destination.geo.country_iso_code`
 * - `source|destination.geo.region_iso_code`
 * - `source|destination.geo.city_name`
 */

var GeoFields = _react.default.memo(function (props) {
  var contextId = props.contextId,
      eventId = props.eventId,
      type = props.type;
  var propNameToFieldName = getGeoFieldPropNameToFieldNameMap(type);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, (0, _fp.uniq)(propNameToFieldName).map(function (geo) {
    return _react.default.createElement(GeoFieldValues, {
      contextId: contextId,
      eventId: eventId,
      fieldName: geo.fieldName,
      key: geo.fieldName,
      values: (0, _fp.get)(geo.prop, props)
    });
  }));
});

exports.GeoFields = GeoFields;
GeoFields.displayName = 'GeoFields';