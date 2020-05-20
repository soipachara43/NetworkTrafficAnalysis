"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _default_config = require("../../pages/detection_engine/components/signals/default_config");

var _default_headers = require("../alerts_viewer/default_headers");

var _default_headers2 = require("../events_viewer/default_headers");

var _default_headers3 = require("../timeline/body/column_headers/default_headers");

var _timeline_context = require("../timeline/timeline_context");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CountsFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "CountsFlexGroup",
  componentId: "dtbl28-0"
})(["margin-top:5px;"]);
CountsFlexGroup.displayName = 'CountsFlexGroup';
var CountFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "CountFlexItem",
  componentId: "dtbl28-1"
})(["margin-right:5px;"]);
CountFlexItem.displayName = 'CountFlexItem'; // background-color: ${props => props.theme.eui.euiColorLightestShade};

var HeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "HeaderContainer",
  componentId: "dtbl28-2"
})(["padding:16px;margin-bottom:8px;"]);

HeaderContainer.displayName = 'HeaderContainer';

var SearchContainer = _styledComponents.default.div.withConfig({
  displayName: "SearchContainer",
  componentId: "dtbl28-3"
})(["input{max-width:", "px;width:", "px;}"], _helpers.SEARCH_INPUT_WIDTH, _helpers.SEARCH_INPUT_WIDTH);

SearchContainer.displayName = 'SearchContainer';

var CountRow = _react.default.memo(function (_ref) {
  var filteredBrowserFields = _ref.filteredBrowserFields;
  return _react.default.createElement(CountsFlexGroup, {
    alignItems: "center",
    "data-test-subj": "counts-flex-group",
    direction: "row",
    gutterSize: "none"
  }, _react.default.createElement(CountFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    "data-test-subj": "categories-count",
    size: "xs"
  }, i18n.CATEGORIES_COUNT(Object.keys(filteredBrowserFields).length))), _react.default.createElement(CountFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    "data-test-subj": "fields-count",
    size: "xs"
  }, i18n.FIELDS_COUNT(Object.keys(filteredBrowserFields).reduce(function (fieldsCount, category) {
    return (0, _helpers.getFieldCount)(filteredBrowserFields[category]) + fieldsCount;
  }, 0)))));
});

CountRow.displayName = 'CountRow';

var TitleRow = _react.default.memo(function (_ref2) {
  var isEventViewer = _ref2.isEventViewer,
      onOutsideClick = _ref2.onOutsideClick,
      onUpdateColumns = _ref2.onUpdateColumns;
  var timelineTypeContext = (0, _timeline_context.useTimelineTypeContext)();
  var handleResetColumns = (0, _react.useCallback)(function () {
    var resetDefaultHeaders = _default_headers3.defaultHeaders;

    if (isEventViewer) {
      var _timelineTypeContext$, _timelineTypeContext$2;

      if (((_timelineTypeContext$ = timelineTypeContext.documentType) === null || _timelineTypeContext$ === void 0 ? void 0 : _timelineTypeContext$.toLocaleLowerCase()) === 'alerts') {
        resetDefaultHeaders = _default_headers.alertsHeaders;
      } else if (((_timelineTypeContext$2 = timelineTypeContext.documentType) === null || _timelineTypeContext$2 === void 0 ? void 0 : _timelineTypeContext$2.toLocaleLowerCase()) === 'signals') {
        resetDefaultHeaders = _default_config.signalsHeaders;
      } else {
        resetDefaultHeaders = _default_headers2.defaultHeaders;
      }
    }

    onUpdateColumns(resetDefaultHeaders);
    onOutsideClick();
  }, [isEventViewer, onOutsideClick, onUpdateColumns, timelineTypeContext]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween",
    direction: "row",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    "data-test-subj": "field-browser-title",
    size: "s"
  }, _react.default.createElement("h2", null, i18n.CUSTOMIZE_COLUMNS))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "reset-fields",
    onClick: handleResetColumns
  }, i18n.RESET_FIELDS)));
});

TitleRow.displayName = 'TitleRow';

var Header = _react.default.memo(function (_ref3) {
  var isEventViewer = _ref3.isEventViewer,
      isSearching = _ref3.isSearching,
      filteredBrowserFields = _ref3.filteredBrowserFields,
      onOutsideClick = _ref3.onOutsideClick,
      onSearchInputChange = _ref3.onSearchInputChange,
      onUpdateColumns = _ref3.onUpdateColumns,
      searchInput = _ref3.searchInput,
      timelineId = _ref3.timelineId;
  return _react.default.createElement(HeaderContainer, null, _react.default.createElement(TitleRow, {
    isEventViewer: isEventViewer,
    onUpdateColumns: onUpdateColumns,
    onOutsideClick: onOutsideClick
  }), _react.default.createElement(SearchContainer, null, _react.default.createElement(_eui.EuiFieldSearch, {
    className: (0, _helpers.getFieldBrowserSearchInputClassName)(timelineId),
    "data-test-subj": "field-search",
    isLoading: isSearching,
    onChange: onSearchInputChange,
    placeholder: i18n.FILTER_PLACEHOLDER,
    value: searchInput
  })), _react.default.createElement(CountRow, {
    filteredBrowserFields: filteredBrowserFields
  }));
});

exports.Header = Header;
Header.displayName = 'Header';