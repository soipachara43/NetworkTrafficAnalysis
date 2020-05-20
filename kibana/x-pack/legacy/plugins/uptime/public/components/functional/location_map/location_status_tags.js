"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationStatusTags = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _contexts = require("../../../contexts");

var _constants = require("../../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TimeStampSpan = _styledComponents.default.span.withConfig({
  displayName: "TimeStampSpan",
  componentId: "sc-3p60pq-0"
})(["display:inline-block;margin-left:4px;"]);

var TextStyle = _styledComponents.default.div.withConfig({
  displayName: "TextStyle",
  componentId: "sc-3p60pq-1"
})(["font-weight:600;"]);

var BadgeItem = _styledComponents.default.div.withConfig({
  displayName: "BadgeItem",
  componentId: "sc-3p60pq-2"
})(["margin-bottom:5px;white-space:nowrap;@media (max-width:830px){display:inline-block;margin-right:16px;}"]); // Set height so that it remains within panel, enough height to display 7 locations tags


var TagContainer = _styledComponents.default.div.withConfig({
  displayName: "TagContainer",
  componentId: "sc-3p60pq-3"
})(["max-height:229px;overflow:hidden;margin-top:auto;"]);

var OtherLocationsDiv = _styledComponents.default.div.withConfig({
  displayName: "OtherLocationsDiv",
  componentId: "sc-3p60pq-4"
})(["padding-left:18px;"]);

var LocationStatusTags = function LocationStatusTags(_ref) {
  var _moment$locale;

  var locations = _ref.locations;

  var _useContext = (0, _react.useContext)(_contexts.UptimeThemeContext),
      _useContext$colors = _useContext.colors,
      gray = _useContext$colors.gray,
      danger = _useContext$colors.danger;

  var upLocations = [];
  var downLocations = [];
  locations.forEach(function (item) {
    if (item.summary.down === 0) {
      upLocations.push({
        label: item.geo.name,
        timestamp: new Date(item.timestamp).valueOf()
      });
    } else {
      downLocations.push({
        label: item.geo.name,
        timestamp: new Date(item.timestamp).valueOf()
      });
    }
  }); // Sort lexicographically by label

  upLocations.sort(function (a, b) {
    return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
  });

  var tagLabel = function tagLabel(item, ind, color) {
    return _react.default.createElement(BadgeItem, {
      key: ind
    }, _react.default.createElement(_eui.EuiBadge, {
      color: color
    }, _react.default.createElement(_eui.EuiText, {
      size: "m"
    }, _react.default.createElement(TextStyle, null, item.label))), _react.default.createElement(TimeStampSpan, null, _react.default.createElement(_eui.EuiText, {
      color: "subdued"
    }, (0, _moment.default)(item.timestamp).fromNow())));
  };

  var prevLocal = (_moment$locale = _moment.default.locale()) !== null && _moment$locale !== void 0 ? _moment$locale : 'en';

  var renderTags = function renderTags() {
    var shortLocale = _moment.default.locale(_constants.SHORT_TS_LOCALE) === _constants.SHORT_TS_LOCALE;

    if (!shortLocale) {
      _moment.default.defineLocale(_constants.SHORT_TS_LOCALE, _constants.SHORT_TIMESPAN_LOCALE);
    }

    var tags = _react.default.createElement(TagContainer, null, _react.default.createElement("span", null, downLocations.map(function (item, ind) {
      return tagLabel(item, ind, danger);
    })), _react.default.createElement("span", null, upLocations.map(function (item, ind) {
      return tagLabel(item, ind, gray);
    }))); // Need to reset locale so it doesn't effect other parts of the app


    _moment.default.locale(prevLocal);

    return tags;
  };

  return _react.default.createElement(_react.default.Fragment, null, renderTags(), locations.length > 7 && _react.default.createElement(OtherLocationsDiv, null, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.locationMap.locations.tags.others",
    defaultMessage: "{otherLoc} Others ...",
    values: {
      otherLoc: locations.length - 7
    }
  })))));
};

exports.LocationStatusTags = LocationStatusTags;