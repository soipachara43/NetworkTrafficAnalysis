"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDetails = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _event_fields_browser = require("./event_fields_browser");

var _json_view = require("./json_view");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Details = _styledComponents.default.div.withConfig({
  displayName: "Details",
  componentId: "sc-19h2nku-0"
})(["user-select:none;"]);

Details.displayName = 'Details';

var EventDetails = _react.default.memo(function (_ref) {
  var browserFields = _ref.browserFields,
      columnHeaders = _ref.columnHeaders,
      data = _ref.data,
      id = _ref.id,
      view = _ref.view,
      onUpdateColumns = _ref.onUpdateColumns,
      onViewSelected = _ref.onViewSelected,
      timelineId = _ref.timelineId,
      toggleColumn = _ref.toggleColumn;
  var tabs = [{
    id: 'table-view',
    name: i18n.TABLE,
    content: _react.default.createElement(_event_fields_browser.EventFieldsBrowser, {
      browserFields: browserFields,
      columnHeaders: columnHeaders,
      data: data,
      eventId: id,
      onUpdateColumns: onUpdateColumns,
      timelineId: timelineId,
      toggleColumn: toggleColumn
    })
  }, {
    id: 'json-view',
    name: i18n.JSON_VIEW,
    content: _react.default.createElement(_json_view.JsonView, {
      data: data
    })
  }];
  return _react.default.createElement(Details, {
    "data-test-subj": "eventDetails"
  }, _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: tabs,
    selectedTab: view === 'table-view' ? tabs[0] : tabs[1],
    onTabClick: function onTabClick(e) {
      return onViewSelected(e.id);
    }
  }));
});

exports.EventDetails = EventDetails;
EventDetails.displayName = 'EventDetails';